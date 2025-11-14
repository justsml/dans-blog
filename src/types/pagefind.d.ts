declare module "https://danlevy.net/pagefind/pagefind.js" {
  export interface PagefindResultItemData {
    url: string;
    excerpt: string;
    raw_content?: string;
    title?: string;
    meta?: Record<string, string>;
    filters?: Record<string, string[]>;
    sort?: Record<string, string>;
  }
  export interface PagefindResultItem {
    id: string;
    data(): Promise<PagefindResultItemData>;
  }
  export interface PagefindSearchResponse {
    results: PagefindResultItem[];
  }
  export interface PagefindInitOptions {
    baseUrl: string;
  }
  export interface PagefindSearchOptions {
    limit?: number;
  }

  const pagefind: {
    init(options: PagefindInitOptions): void;
    search(
      query: string,
      options?: PagefindSearchOptions
    ): Promise<PagefindSearchResponse>;
    preload(query: string): Promise<void>;
  };
  export default pagefind;
}