import { BadRequestException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { FetcherResult } from "../types/scoring.types";

@Injectable()
export class FetcherService {
  constructor(private readonly httpService: HttpService) {}

  async fetch(url: string): Promise<FetcherResult> {
    const res = await firstValueFrom(
      this.httpService.get<string>(url, {
        responseType: "text",
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 15000,
        maxRedirects: 5,
      }),
    );

    return {
      status: res.status,
      html: res.data,
      headers: res.headers ?? {},
    };
  }
}
