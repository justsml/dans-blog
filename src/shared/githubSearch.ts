import { Octokit } from "@octokit/rest";
import { makeLogs } from "@/components/LogHelper.ts";
import { Semaphore, SemaphoreInterface, withTimeout } from "async-mutex";
import type {
  LocalCache,
  SearchCommitsResponse,
  SearchIssuesResponse,
} from "../types.ts";
import createLocalCache from "./localCache.ts";

const log = makeLogs(`ghSearch`);

/**
 * Note: Constructor Wrapper
 */
export default function _githubSearch(
  this: GithubSearch,
  options: GitHubCardOptions,
) {
  if (this instanceof GithubSearch === false) return new GithubSearch(options);
}

type GitHubCardOptions = {
  api_key?: string;
  per_page?: number;
  ttl_seconds?: number;
  exit_on_error?: boolean;
  abort_controller?: AbortController;
  parallel_limit?: number;
  queue_timeout?: number;
};

export class GithubSearch {
  private octokit: Octokit;
  private localCache: LocalCache | null = null;
  private semaphore: SemaphoreInterface;

  constructor(private options: GitHubCardOptions) {
    
    this.localCache = createLocalCache(".data/github-repo-cache.db");

    this.octokit = new Octokit({
      auth: this.options.api_key,
      request: {
        signal: this.options?.abort_controller?.signal,
      },
    });

    const timeout = this.options.queue_timeout ?? 15000;
    this.semaphore = withTimeout(
      new Semaphore(this.options.parallel_limit || 5),
      timeout,
      new Error("Semaphore wait timeout"),
    );

    // Add request interceptor for caching
    this.octokit.hook.wrap("request", async (request, options) => {
      let query = "";
      try {
        const url = new URL(options.url);
        query = url.searchParams.toString();
      } catch (error) {
        console.error("Error in request hook", error);
        throw error;
      }
      console.log("Request options", query);
      // const url = options.request
      // const query = url.searchParams.toString();

      const cacheKey = `${options.url}?${new URLSearchParams(query || {}).toString()}&body=${JSON.stringify(options.data)}`;
      log(`Checking cache for ${cacheKey}`);

      if (this.localCache) {
        const cached = this.localCache.get(cacheKey);
        if (cached) {
          log(`Cache hit for ${cacheKey}`);
          return { data: cached, status: 200, headers: {}, url: options.url };
        }
      }

      const response = await request(options);

      if (this.localCache) {
        log(`Caching response for ${cacheKey}`);
        this.localCache.set(cacheKey, response.data);
      }

      return response;
    });
  }

  async pullRequests(
    repo: string,
    query: string,
  ): Promise<SearchIssuesResponse> {
    return this.semaphore.runExclusive(async () => {
      try {
        const [owner, repoName] = repo.split("/");
        const response = await this.octokit.search.issuesAndPullRequests({
          q: `repo:${repo} is:pr ${query}`,
          headers: {
            Accept: "application/vnd.github.shadow-cat-preview+json",
          },
          per_page: this.options.per_page,
        });

        if (response.data.incomplete_results === true) {
          console.warn(
            "Incomplete results for pull requests search. Consider increasing the per_page parameter. " +
              repo +
              ": " +
              query,
          );
        }

        return response.data;
      } catch (error) {
        console.error("Error searching pull requests:", error);
        if (this.options.exit_on_error) process.exit(42);
        throw error;
      }
    });
  }

  async commits(repo: string, query: string): Promise<SearchCommitsResponse> {
    return this.semaphore.runExclusive(async () => {
      try {
        const response = await this.octokit.search.commits({
          q: `repo:${repo} ${query}`,
          per_page: this.options.per_page,
        });

        if (response.data.incomplete_results === true) {
          console.warn(
            "Incomplete results for commits search. Consider increasing the per_page parameter. " +
              repo +
              ": " +
              query,
          );
        }

        return response.data;
      } catch (error) {
        console.error("Error searching commits:", error);
        if (this.options.exit_on_error) process.exit(42);
        throw error;
      }
    });
  }

  async issues(repo: string, query: string): Promise<SearchIssuesResponse> {
    return this.semaphore.runExclusive(async () => {
      try {
        const response = await this.octokit.search.issuesAndPullRequests({
          q: `repo:${repo} is:issue ${query}`,
          per_page: this.options.per_page,
        });

        if (response.data.incomplete_results === true) {
          console.warn(
            "Incomplete results for issues search. Consider increasing the per_page parameter. " +
              repo +
              ": " +
              query,
          );
        }

        return response.data;
      } catch (error) {
        console.error("Error searching issues:", error);
        if (this.options.exit_on_error) process.exit(42);
        throw error;
      }
    });
  }
}
