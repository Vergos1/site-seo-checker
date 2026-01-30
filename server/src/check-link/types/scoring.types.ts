export interface FetcherResult {
  status: number;
  html: string;
  headers: Record<string, unknown>;
}

export interface Signals {
  config: {
    status: number;
    headers: Record<string, unknown>;
  };
  seo: {
    title: string | undefined;
    description: string | undefined;
    OGDescription: string | undefined;
    linkTag: string | undefined;
    htmlHasLanguage: string | undefined;
    viewport: string | undefined;
    charset: string | undefined;
    httpEquivRefresh: boolean | undefined;
    robotsNoIndex: boolean | undefined;
    keywords: string | undefined;
  };
  content: {
    hasH2: boolean;
    h1ListCount: number;
    imagesCount: number;
    imagesWithAltCount: number;
    linksCount: number;
    linksWithEmptyHrefCount: number;
    section: boolean;
    main: boolean;
    footer: boolean;
    header: boolean;
    nav: boolean;
  };
}
