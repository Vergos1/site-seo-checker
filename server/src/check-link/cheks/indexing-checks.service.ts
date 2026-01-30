import { Injectable } from "@nestjs/common";
import { ParserService } from "../parser/parser.service";

@Injectable()
export class IndexingChecksService {
  constructor(private readonly parserService: ParserService) {}

  async checkIndexing(url: string) {
    const { seo } = await this.parserService.parse(url);

    // Bonus points
    const title = seo.title ? 25 : 0;
    const description = seo.description ? 15 : 0;
    const OGDescription = seo.OGDescription ? 5 : 0;
    const linkTag = seo.linkTag ? 20 : 0;
    const htmlHasLanguage = seo.htmlHasLanguage ? 10 : 0;
    const viewport = seo.viewport ? 10 : 0;
    const charset = seo.charset ? 10 : 0;

    // Penalty points
    const httpEquivRefresh = seo.httpEquivRefresh ? 20 : 0;
    const robotsNoIndex = seo.robotsNoIndex ? 80 : 0;
    const keywords = seo.keywords ? 5 : 0;

    const score =
      title +
      description +
      OGDescription +
      linkTag +
      htmlHasLanguage +
      viewport +
      charset -
      (httpEquivRefresh + robotsNoIndex + keywords);

    if (score < 0) {
      return 0;
    } else if (score > 100) {
      return 100;
    }
    return score;
  }
}
