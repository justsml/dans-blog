import axios, { AxiosInstance } from "axios";

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
  apiKey: string,
  options: { per_page: number } = { per_page: 100 },
) {
  if (this instanceof GithubSearch === false) {
    return new GithubSearch(apiKey, options);
  }
}

type GitHubCardOptions = {
  per_page: number;
  exit_on_error: boolean;
  abort_controller?: AbortController;
};

/**
 * githubSearch - A factory function to create a new GitHubSearch instance.
 */
export class GithubSearch {
  private axiosInstance: AxiosInstance;

  constructor(
    private apiKey?: string | undefined,
    private options: GitHubCardOptions = {
      per_page: 100,
      exit_on_error: true,
    },
  ) {
    this.apiKey = apiKey;
    this.options = options;
    this.axiosInstance = axios.create({
      baseURL: "https://api.github.com",
      headers: {
        Authorization: `token ${this.apiKey}`,
      },
      signal: this.options?.abort_controller?.signal,
    });
  }

  async pullRequests(repo: string, query: string) {
    try {
      const response = await this.axiosInstance.get(`/search/issues`, {
        params: {
          q: `repo:${repo} is:pr ${query}`,
          per_page: this.options.per_page,
        },
      });
      if (response.data.incomplete_results === true) {
        console.warn(
          "Incomplete results for pull requests search. Consider increasing the per_page parameter. " +
            repo +
            ": " +
            query,
        );
      }

      return response.data.items;
    } catch (error) {
      console.error("Error searching pull requests:", error);
      if (exit_on_error) process.exit(42);
      throw error;
    }
  }

  async commits(repo: string, query: string) {
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
      if (response.data.incomplete_results === true) {
        console.warn(
          "Incomplete results for pull requests search. Consider increasing the per_page parameter. " +
            repo +
            ": " +
            query,
        );
      }
      return response.data.items;
    } catch (error) {
      console.error("Error searching commits:", error);
      throw error;
    }
  }

  async issues(repo: string, query: string) {
    try {
      const response = await this.axiosInstance.get(`/search/issues`, {
        params: {
          q: `repo:${repo} is:issue ${query}`,
          per_page: this.options.per_page,
        },
      });
      if (response.data.incomplete_results === true) {
        console.warn(
          "Incomplete results for pull requests search. Consider increasing the per_page parameter. " +
            repo +
            ": " +
            query,
        );
      }
      return response.data.items;
    } catch (error) {
      console.error("Error searching issues:", error);
      throw error;
    }
  }
}
