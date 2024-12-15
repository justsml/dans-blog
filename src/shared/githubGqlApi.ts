import { graphql } from "@octokit/graphql";
import createLocalCache from "./localCache.ts";
import { makeLogs } from "../components/LogHelper.ts";
import { UserPullRequestData } from "../types.ts";

const log = makeLogs(`gitQlApi`);

const DEFAULT_TTL_MS = 1000 * 60 * 60 * 24 * 1; // 1 day

let cache: ReturnType<typeof createLocalCache>;

const makeCacheKey = (repo: string, username: string) =>
  `pr:${repo}:${username}`;

/**
 * Call to ensure cache is initialized
 */
const initCache = async () => {
  if (!cache) cache = createLocalCache(".data/github-repo-cache.db");
  return cache;
};

export const _isValidRepo = (repo: string) =>
  /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(
    repo,
  );
function validateArgs(repo: string, username: string) {
  if (!_isValidRepo(repo)) throw new Error("Invalid repository name");
  if (!username) throw new Error("Invalid username");
  return { repo, username };
}

export async function fetchUserPullRequests(
  repo: string,
  username: string,
): Promise<UserPullRequestData> {
  // start Cache code
  if (!cache) cache = await initCache();
  const key = makeCacheKey(repo, username);
  const cached = await cache.get(key);
  if (cached) return cached as UserPullRequestData;
  // end Cache code

  validateArgs(repo, username);

  const [owner, name] = repo.split("/");
  const searchQuery = `repo:${owner}/${name} is:pr author:${username}`;

  const result = (await graphql({
    query: `
      query ($owner: String!, $name: String!, $searchQuery: String!) {
        repository(owner: $owner, name: $name) {
          name
          description
          forkCount
          stargazerCount
          watchers {
            totalCount
          }
          issues(states: OPEN) {
            totalCount
          }
          primaryLanguage {
            name
          }
          owner {
            login
          }
        }
        search(query: $searchQuery, type: ISSUE, first: 50) {
          nodes {
            ... on PullRequest {
              title
              url
              state
              author {
                login
              }
              createdAt
              mergedAt
              additions
              deletions
              changedFiles
              comments {
                totalCount
              }
              reviews {
                totalCount
              }
              mergedBy {
                login
              }
              reviewRequests(first: 10) {
                nodes {
                  requestedReviewer {
                    ... on User { login }
                    ... on Team { name }
                  }
                }
              }
            }
          }
        }
      }
    `,
    owner,
    name,
    searchQuery,
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  })) as unknown;

  log("gql result: %o", result);
  if (!result || typeof result !== "object")
    throw new Error("No data returned from GitHub API");
  if (!("repository" in result))
    throw new Error("No repository data returned from GitHub API");
  if (!("search" in result))
    throw new Error("No search data returned from GitHub API");

  const data = simplifyPullsResponse(result);
  if (cache) await cache.set(key, data, { ttlMs: DEFAULT_TTL_MS });

  return data;
}

const extractLastUrlParam = (url: string) => {
  if (url.includes("?")) url = url.split("?")[0];
  const parts = url.split("/");
  return parts[parts.length - 1];
}
function simplifyPullsResponse(response: any): UserPullRequestData {
  const { repository, search } = response;

  // Flatten repository details
  const repoDetails = {
    name: repository.name,
    description: repository.description,
    owner: repository.owner.login,
    forks: repository.forkCount,
    stars: repository.stargazerCount,
    watchers: repository.watchers.totalCount,
    openIssues: repository.issues.totalCount,
    primaryLanguage: repository.primaryLanguage?.name || null,
  };

  // Flatten pull request details
  const pullRequests = search.nodes.map((pr: any) => ({
    title: pr.title,
    url: pr.url,
    state: pr.state,
    number: pr.number ?? extractLastUrlParam(pr.url),
    author: pr.author.login,
    createdAt: pr.createdAt,
    mergedAt: pr.mergedAt,
    additions: pr.additions,
    deletions: pr.deletions,
    changedFiles: pr.changedFiles,
    comments: pr.comments.totalCount,
    reviews: pr.reviews.totalCount,
    mergedBy: pr.mergedBy?.login || null,
    reviewRequests: pr.reviewRequests.nodes.map((req: any) => ({
      reviewer:
        req.requestedReviewer?.login || req.requestedReviewer?.name || null,
    })),
  }));

  return {
    repository: repoDetails,
    pullCount: pullRequests.length,
    pullRequests,
  };
}

// console.log("pr: moby/moby %o", await fetchUserPullRequests("moby/moby", "justsml"));
// console.log("pr: remix-run/react-router %o", await fetchUserPullRequests("remix-run/react-router", "justsml"));

// console.log("commits: moby/moby %o", await fetchUserCommits("moby/moby", "justsml@gmail.com"));
// console.log("commits: remix-run/react-router %o", await fetchUserCommits("remix-run/react-router", "justsml@gmail.com"));
