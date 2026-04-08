import { IsUUID } from "class-validator";

export class DeleteTenantDto {
  @IsUUID()
  id!: string;
}