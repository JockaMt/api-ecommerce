import { TenantContext } from "@/modules/tenant/tenant-context.type";

declare global {
    namespace Express {
        interface Request {
            tenant?: TenantContext;
        }
    }
}

export { };
