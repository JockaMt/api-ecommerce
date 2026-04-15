import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NestMiddleware,
    NotFoundException,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { TenantRepository } from "@/modules/tenant/repositories/tenant.repository";
import { TenantContext } from "@/modules/tenant/tenant-context.type";

type CacheItem = {
    value: TenantContext;
    expiresAt: number;
};

@Injectable()
export class TenantHostMiddleware implements NestMiddleware {
    private readonly cache = new Map<string, CacheItem>();
    private readonly ttlMs = 60_000;

    constructor(private readonly tenantRepository: TenantRepository) { }

    private normalizeTenantKey(value: string): string {
        return value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    async use(req: Request, _res: Response, next: NextFunction) {
        if (this.isBypassedRoute(req.path)) {
            return next();
        }

        const host = this.getHost(req);
        if (!host) {
            throw new BadRequestException("Host ausente ou invalido");
        }

        const tenantKey = this.resolveTenantKey(host);
        if (!tenantKey) {
            throw new BadRequestException("Nao foi possivel resolver o tenant pelo host");
        }

        const cached = this.getCache(tenantKey);
        if (cached) {
            req.tenant = cached;
            return next();
        }

        const tenant = await this.tenantRepository.findByHostKey(tenantKey);
        if (!tenant) {
            throw new NotFoundException("Tenant nao encontrado");
        }

        if (tenant.status !== "active") {
            throw new ForbiddenException("Tenant inativo ou suspenso");
        }

        const context: TenantContext = {
            id: tenant.id,
            name: tenant.name,
            status: tenant.status,
        };

        this.setCache(tenantKey, context);
        req.tenant = context;

        return next();
    }

    private isBypassedRoute(path: string): boolean {
        return (
            path.startsWith("/docs") ||
            path === "/health"
        );
    }

    private getHost(req: Request): string | null {
        const forwardedRaw = req.headers["x-forwarded-host"];
        const hostRaw = req.headers.host;

        const forwarded = Array.isArray(forwardedRaw) ? forwardedRaw[0] : forwardedRaw;
        const host = Array.isArray(hostRaw) ? hostRaw[0] : hostRaw;

        const value = (forwarded || host || "").toString().trim().toLowerCase();
        if (!value) {
            return null;
        }

        const firstHost = value.split(",")[0]?.trim() || "";
        return firstHost.split(":")[0] || null;
    }

    private resolveTenantKey(host: string): string | null {
        if (host.endsWith(".localhost")) {
            const localTenant = host.replace(".localhost", "").trim();
            return this.normalizeTenantKey(localTenant) || null;
        }

        const baseDomain = process.env.TENANT_BASE_DOMAIN?.trim().toLowerCase();
        if (baseDomain && host.endsWith(`.${baseDomain}`)) {
            const tenant = host.slice(0, host.length - (baseDomain.length + 1)).trim();
            return this.normalizeTenantKey(tenant) || null;
        }

        return null;
    }

    private getCache(key: string): TenantContext | null {
        const item = this.cache.get(key);
        if (!item) {
            return null;
        }

        if (Date.now() > item.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    private setCache(key: string, value: TenantContext) {
        this.cache.set(key, {
            value,
            expiresAt: Date.now() + this.ttlMs,
        });
    }
}
