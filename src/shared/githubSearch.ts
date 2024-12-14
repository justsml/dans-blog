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

/**
 * githubSearch - A factory function to create a new GitHubSearch instance.
 */
export class GithubSearch {
  private apiKey?: string;
  private options: { per_page: number };
  private axiosInstance: AxiosInstance;

  constructor(
    apiKey?: string | undefined,
    options: { per_page: number } = { per_page: 100 },
  ) {
    this.apiKey = apiKey;
    this.options = options;
    this.axiosInstance = axios.create({
      baseURL: "https://api.github.com",
      headers: {
        Authorization: `token ${this.apiKey}`,
      },
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
          "Incomplete results for pull requests search. Consider increasing the per_page parameter. " + repo + ": " + query,
        );
      }
      
      return response.data.items;
    } catch (error) {
      console.error("Error searching pull requests:", error);
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
          "Incomplete results for pull requests search. Consider increasing the per_page parameter. " + repo + ": " + query,
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
          "Incomplete results for pull requests search. Consider increasing the per_page parameter. " + repo + ": " + query,
        );
      }
      return response.data.items;
    } catch (error) {
      console.error("Error searching issues:", error);
      throw error;
    }
  }
}
