import { Module } from "@nestjs/common";
import { CheckLinkController } from "./check-link.controller";
import { CheckLinkService } from "./check-link.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Link } from "./entities/check-link-history.entity";
import { HttpModule } from "@nestjs/axios";
import { FetcherService } from "./fetcher/fetcher.service";
import { ParserService } from "./parser/parser.service";
import { SemanticChecksService } from "./cheks/semantic-checks.service";
import { IndexingChecksService } from "./cheks/indexing-checks.service";

@Module({
  imports: [TypeOrmModule.forFeature([Link]), HttpModule],
  controllers: [CheckLinkController],
  providers: [
    CheckLinkService,
    FetcherService,
    ParserService,
    SemanticChecksService,
    IndexingChecksService,
  ],
})
export class CheckLinkModule {}
