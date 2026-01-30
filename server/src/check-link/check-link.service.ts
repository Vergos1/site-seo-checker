import { Injectable } from "@nestjs/common";
import { CheckLinkDto } from "./dto/check-link.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Link } from "./entities/check-link-history.entity";
import { ParserService } from "./parser/parser.service";
import { AuditEnum } from "./types/audit";
import { SemanticChecksService } from "./cheks/semantic-checks.service";
import { IndexingChecksService } from "./cheks/indexing-checks.service";

@Injectable()
export class CheckLinkService {
  constructor(
    @InjectRepository(Link)
    private readonly checkLinkHistoryRepository: Repository<Link>,
    private readonly parserService: ParserService,
    private readonly semanticChecksService: SemanticChecksService,
    private readonly indexingChecksService: IndexingChecksService,
  ) {}

  async getCheckHistory() {
    const history = await this.checkLinkHistoryRepository.find();

    return {
      items: history,
      total: history.length,
      message: history.length > 0 ? "History found" : "No history yet",
    };
  }

  async checkLink(type: AuditEnum, dto: CheckLinkDto): Promise<any> {
    let score = 0;
    if (type === AuditEnum.SEMANTIC) {
      score = await this.semanticChecksService.checkSemantic(dto.link);
    } else if (type === AuditEnum.INDEXING) {
      score = await this.indexingChecksService.checkIndexing(dto.link);
    }

    const historyItem = this.checkLinkHistoryRepository.create({
      link: dto.link,
      type,
      score,
      date: new Date(),
    });

    await this.checkLinkHistoryRepository.save(historyItem);
    return {
      item: historyItem,
      score,
    };
  }
}
