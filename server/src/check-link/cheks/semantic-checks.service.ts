import { Injectable } from "@nestjs/common";
import { ParserService } from "./../parser/parser.service";

@Injectable()
export class SemanticChecksService {
  constructor(private readonly parserService: ParserService) {}

  async checkSemantic(url: string) {
    const { content } = await this.parserService.parse(url);

    // Bonus points
    const hasH2 = content.hasH2 ? 10 : 0;
    const imagesCount = content.imagesCount > 0 ? 5 : 0;
    const imagesAlt = content.imagesCount === content.imagesWithAltCount ? 10 : 0;
    const linksCount = content.linksCount ? 5 : 0;
    const linksWithEmptyHrefCount = content.linksWithEmptyHrefCount === 0 ? 10 : 0;
    const section = content.section ? 7 : 0;
    const main = content.main ? 7 : 0;
    const footer = content.footer ? 7 : 0;
    const header = content.header ? 7 : 0;
    const nav = content.nav ? 7 : 0;

    // Penalty points
    const h1ListCount = content.h1ListCount === 1 ? 0 : 10;

    const score =
      hasH2 +
      imagesCount +
      imagesAlt +
      linksCount +
      linksWithEmptyHrefCount +
      section +
      main +
      footer +
      header +
      nav -
      h1ListCount;

    if (score < 0) {
      return 0;
    } else if (score > 100) {
      return 100;
    }
    return score;
  }
}
