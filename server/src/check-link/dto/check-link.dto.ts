import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { AuditEnum } from "../types/audit";
export class CheckLinkDto {
  @IsOptional()
  @IsEnum(AuditEnum)
  type?: AuditEnum;

  @IsUrl()
  @IsNotEmpty()
  link!: string;
}
