import axios, { AxiosInstance } from "axios";
import type { LocalCache } from "../types.ts";
import type { Endpoints } from "@octokit/types";
import { makeLogs } from "@/components/LogHelper.ts";

const log = makeLogs(`ghSearch`);

type SearchCommitsResponse =
  Endpoints["GET /search/commits"]["response"]["data"];
type SearchIssuesResponse = Endpoints["GET /search/issues"]["response"]["data"];

/**
 * Note: Constructor Wrapper
 *
 * githubSearch - A factory function to create a new GitHubSearch instance.
 * @param apiKey
 * @param options
 * @returns
 */
export default function _githubSearch(
  this: GithubSearch,
  options: GitHubCardOptions,
) {
  if (this instanceof GithubSearch === false) return new GithubSearch(options);
}

type GitHubCardOptions = {
  api_key: string;
  per_page: number;
  ttl_seconds?: number;
  exit_on_error?: boolean;
  abort_controller?: AbortController;
};

/**
 * githubSearch - A factory function to create a new GitHubSearch instance.
 */
export class GithubSearch {
  private axiosInstance: AxiosInstance;
  private localCache: LocalCache | null = null;

  constructor(private options: GitHubCardOptions) {
    this.options = options;
    this.axiosInstance = axios.create({
      baseURL: "https://api.github.com",
      headers: {
        Authorization: `token ${this.options.api_key}`,
      },
      signal: this.options?.abort_controller?.signal,
    });
    this.axiosInstance.interceptors.request.use((config) => {
      const cacheKey = `${config.url}?${new URLSearchParams(config.params).toString()}&body=${JSON.stringify(config.data)}`;
      log(`Checking cache for ${cacheKey}`);
      if (this.localCache) {
        const cached = this.localCache.get(cacheKey);
        config.adapter = async () => {
          return {
            data: cached,
            status: 200,
            statusText: "OK",
            headers: {},
            config,
            request: {},
          };
        };
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use((response) => {
      const config = response.config;
      const cacheKey = `${config.url}?${new URLSearchParams(config.params).toString()}&body=${JSON.stringify(config.data)}`;
      log(`Caching response for ${cacheKey}`);
      // const cacheKey = `${response.config.url}?${new URLSearchParams(response.config.params).toString()}`;
      if (this.localCache)
        this.localCache.set(cacheKey, response.data);

      return response;
    });
  }

  async pullRequests(
    repo: string,
    query: string,
  ): Promise<SearchIssuesResponse> {
    try {
      const response = (
        await this.axiosInstance.get(`/search/issues`, {
          params: {
            q: `repo:${repo} is:pr ${query}`,
            per_page: this.options.per_page,
          },
        })
      ).data as SearchIssuesResponse;
      if (response.incomplete_results === true)
        console.warn(
          "Incomplete results for pull requests search. Consider increasing the per_page parameter. " +
            repo +
            ": " +
            query,
        );

      return response;
    } catch (error) {
      console.error("Error searching pull requests:", error);
      if (this.options.exit_on_error) process.exit(42);
      throw error;
    }
  }

  async commits(repo: string, query: string): Promise<SearchCommitsResponse> {
    try {
      const response = await this.axiosInstance.get(`/search/commits`, {
        params: {
          q: `repo:${repo} ${query}`,
          per_page: this.options.per_page,
        },
        headers: {
          Accept: "application/vnd.github.cloak-preview",
        },
      });
      const data = response.data as SearchCommitsResponse;
      if (data.incomplete_results === true) {
        console.warn(
          "Incomplete results for pull requests search. Consider increasing the per_page parameter. " +
            repo +
            ": " +
            query,
        );
      }
      return data;
    } catch (error) {
      console.error("Error searching commits:", error);
      if (this.options.exit_on_error) process.exit(42);
      throw error;
    }
  }

  async issues(repo: string, query: string): Promise<SearchIssuesResponse> {
    try {
      const response = await this.axiosInstance.get(`/search/issues`, {
        params: {
          q: `repo:${repo} is:issue ${query}`,
          per_page: this.options.per_page,
        },
      });
      const data = response.data as SearchIssuesResponse;

      if (data.incomplete_results === true) {
        console.warn(
          "Incomplete results for pull requests search. Consider increasing the per_page parameter. " +
            repo +
            ": " +
            query,
        );
      }
      return data;
    } catch (error) {
      console.error("Error searching issues:", error);
      if (this.options.exit_on_error) process.exit(42);
      throw error;
    }
  }
}
