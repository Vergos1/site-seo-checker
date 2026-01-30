import { Injectable } from "@nestjs/common";
import { FetcherService } from "../fetcher/fetcher.service";
import * as cheerio from "cheerio";
import { Signals } from "../types/scoring.types";

@Injectable()
export class ParserService {
  constructor(private readonly fetcherService: FetcherService) {}

  async parse(url: string) {
    const { html, status, headers } = await this.fetcherService.fetch(url);
    const $ = cheerio.load(html);

    //SEO SIGNALS
    const title = $("title").text(); // its +
    const description = $('meta[name="description" i]').attr("content");
    const OGDescription = $("meta[property='og:description' i]").attr("content");
    const linkTag = $("link[rel='canonical' i]").attr("href")?.trim();
    const htmlHasLanguage = $("html").attr("lang")?.trim();
    const viewport = $("meta[name='viewport']").attr("content")?.trim();
    const charset = $("meta").attr("charset")?.trim();
    const httpEquivRefresh = $("meta").attr("http-equiv")?.includes("cheerio");
    const robotsNoIndex = $("meta[name='robots']").attr("content")?.includes("noindex");
    const keywords = $('meta[name="keywords"]').attr("content");

    //CONTENT SIGNALS
    const hasH2 = Boolean($("h2").text().trim() && $("h2").length > 0);
    const h1ListCount = $("h1").length;

    const imagesCount = $("img").length;
    const imagesWithAltCount =
      $("img").filter((_, img) => $(img).attr("alt")?.trim() !== "").length ?? 0;

    const linksCount = $("a").length;
    const linksWithEmptyHrefCount = $("a").attr("href")?.length ?? 0;
    const section = $("section").length > 0;
    const main = $("main").length > 0;
    const footer = $("footer").length > 0;
    const header = $("header").length > 0;
    const nav = $("nav").length > 0;

    const signals: Signals = {
      config: {
        status,
        headers,
      },
      seo: {
        title,
        description,
        OGDescription,
        linkTag,
        htmlHasLanguage,
        viewport,
        charset,
        httpEquivRefresh,
        robotsNoIndex,
        keywords,
      },
      content: {
        hasH2,
        h1ListCount,
        imagesCount,
        imagesWithAltCount,
        linksCount,
        linksWithEmptyHrefCount,
        section,
        main,
        footer,
        header,
        nav,
      },
    };

    return signals;
  }
}
