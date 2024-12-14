import React, { useState, useEffect } from "react";
import { GithubSearch } from "../../shared/githubSearch.ts";
import { OssContribution } from "../../types.ts";
const { GITHUB_TOKEN } = process.env;

export const RepoCard = ({
  contribution,
  author,
}: {
  contribution: OssContribution;
  author: string;
}) => {
  const { repo, renamed, star_count, reaction_count, descriptionOverride, pull_request_url } = contribution;

  // const [contributions, setContributions] = useState(null);
  const [repoData, setRepoData] = useState<any>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      // make sure we DON'T have a key
      if (GITHUB_TOKEN && GITHUB_TOKEN.length >= 1) {
        console.error("Missing GITHUB_TOKEN");
        throw new Error("GITHUB_TOKEN shouldn't be in the client bundle");
      }
    }
      // GITHUB_TOKEN
    // Client-side
    const githubSearch = new GithubSearch(GITHUB_TOKEN);
    githubSearch
      .pullRequests(repo, `is:pull-request is:open author:${author}`)
      .then((data) => {
        setRepoData(data);
        return data;
      })
      .catch((error) => {
        console.error("Error searching repo:", error);
      });
  }, [repo]);

  if (!repoData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.repoName}>
        <a
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          {repo ?? repoData.title}
        </a>
      </h2>
      <p style={styles.description}>{repoData.description}</p>
      <div style={styles.stats}>
        <span style={styles.stat}>
          <span style={styles.icon}>🌟</span>
          {repoData.stargazers_count}
        </span>
        <span style={styles.stat}>
          <span className="icon-github-stars"></span>
          {repoData.forks_count}
        </span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #e1e4e8",
    borderRadius: "6px",
    padding: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(27,31,35,0.12), 0 1px 2px rgba(27,31,35,0.24)",
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
    color: "#24292e",
  },
  repoName: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 8px",
  },
  link: {
    textDecoration: "none",
    color: "#0366d6",
  },
  description: {
    fontSize: "14px",
    color: "#586069",
    margin: "0 0 16px",
  },
  stats: {
    display: "flex",
    alignItems: "center",
  },
  stat: {
    display: "flex",
    alignItems: "center",
    marginRight: "16px",
    fontSize: "12px",
    color: "#586069",
  },
  icon: {
    marginRight: "4px",
    width: "16px",
    height: "16px",
  },
};
