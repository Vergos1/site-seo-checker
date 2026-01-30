import { BadRequestException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { FetcherResult } from "../types/scoring.types";

@Injectable()
export class FetcherService {
  constructor(private readonly httpService: HttpService) {}

  async fetch(url: string): Promise<FetcherResult> {
    try {
      const res = await firstValueFrom(
        this.httpService.get<string>(url, {
          responseType: "text",
          headers: { "User-Agent": "Mozilla/5.0" },
          timeout: 15000,
          maxRedirects: 5,
          validateStatus: () => true,
        }),
      );

      return {
        status: res.status,
        html: res.data,
        headers: res.headers ?? {},
      };
    } catch {
      throw new BadRequestException("Website is not reachable or does not exist");
    }
  }
}
