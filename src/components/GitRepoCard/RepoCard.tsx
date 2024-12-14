import { useState, useEffect } from "react";
import { GithubSearch } from "../../shared/githubSearch.ts";
import { Contribution } from "../../types.ts";

export const RepoCard = ({
  contribution: c,
  author,
}: {
  contribution: Contribution;
  author: string;
}) => {
  const { repo } = c;

  // const [contributions, setContributions] = useState(null);
  // 
  const [repoName, setRepoName] = useState<string>(c.repo);
  const [description, setDescription] = useState<string>(c.description_override);
  const [starCount, setStarCount] = useState<number>(c.star_count ?? 0);
  const [forkCount, setForkCount] = useState<number>(c.reaction_count ?? 0);
  const [commentCount, setCommentCount] = useState<number>(c.comment_count ?? 0);
  
  // Client side
  const [repoData, setRepoData] = useState<any>({});
  useEffect(() => {
      // GITHUB_TOKEN
    // Client-side
    const githubSearch = new GithubSearch(undefined);
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
    <article style={styles.card} className="repo-card">
      <h2 style={styles.repoName} className="repo-name">
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
          <span className="icon-github-star"></span>
          {repoData.stargazers_count}
        </span>
        <span style={styles.stat}>
          <span className="icon-github-octacat"></span>
          {repoData.forks_count}
        </span>
      </div>
    </article>
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
