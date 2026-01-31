import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CheckLinkDto } from "./dto/check-link.dto";
import { CheckLinkService } from "./check-link.service";
import { AuditEnum } from "./types/audit";

@Controller("check-link")
export class CheckLinkController {
  constructor(private readonly checkLinkService: CheckLinkService) {}

  @Get("/history")
  getCheckHistory() {
    return this.checkLinkService.getCheckHistory();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  checkLinkByPath(@Query("type") type: AuditEnum, @Body() dto: CheckLinkDto) {
    const auditType = type ?? AuditEnum.INDEXING;
    return this.checkLinkService.checkLink(auditType, dto);
  }
}
