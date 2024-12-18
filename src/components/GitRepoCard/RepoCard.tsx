import { useState } from "react";
import type { Contribution, UserPullRequestData } from "../../types.ts";
import clsx from "clsx";
import { LineChangeIndicator } from "./LineChangeIndicator.tsx";

// const githubSearch = new GithubSearch({
//   per_page: 40,
// });

export const RepoCard = ({
  contribution: c,
  defaultPullData: pr,
  // author,
}: {
  author: string;
  contribution: Contribution;
  defaultPullData?: UserPullRequestData;
}) => {
  const { repo } = c;

  // const [contributions, setContributions] = useState(null);
  const prList = pr?.pullRequests ?? [];

  // const [repoName, setRepoName] = useState<string>(c.repo);
  // const [description, setDescription] = useState<string>(c.description_override);
  // const [starCount, setStarCount] = useState<number>(c.star_count ?? 0);
  // const [forkCount, setForkCount] = useState<number>(c.reaction_count ?? 0);
  // const [commentCount, setCommentCount] = useState<number>(c.comment_count ?? 0);

  // Client side
  const [repoData, _setRepoData] = useState<UserPullRequestData | undefined>(
    pr,
  );
  // useEffect(() => {
  //   // Client-side
  //   githubSearch
  //     .pullRequests(repo, `is:pull-request is:closed author:${author}`)
  //     .then((data) => {
  //       setRepoData(data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       console.error("Error searching repo:", error);
  //     });
  // }, [repo]);

  if (!repoData) {
    return <div>Loading...</div>;
  }

  return (
    <article
      style={styles.card}
      className={clsx("repo-card", "h-card")}
      data-pull-count={prList?.length}
      data-star-count={pr?.repository.stars}
      data-open-issues={pr?.repository.openIssues}
      data-watchers={pr?.repository.watchers}
      data-forks={pr?.repository.forks}
      data-primary-language={pr?.repository.primaryLanguage}
      data-repo-name={pr?.repository.name}
      data-repo-description={pr?.repository.description}
      data-repo-owner={pr?.repository.owner}
    >
      <aside className="corner-stats">
        <div style={styles.stat} className="repo-stars-box button-ish-box">
          <span className="gh-icon icon-github-star"></span>
          {pr?.repository.stars.toLocaleString()}
        </div>
        <LineChangeIndicator additions={pr?.pullStats.additions} deletions={pr?.pullStats.deletions} />
      </aside>
        

      <h2 style={styles.repoName} className="repo-name">
        <span className="gh-icon icon-github-octocat w-2 h-2"></span>
        <a
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          title={c.renamed ? `MOVED: ${c.renamed}` : repo}
          style={styles.link}
          className="p-org"
        >
          {repo}
        </a>
      </h2>
      <p style={styles.description} className="repo-inner-card description">
        {c.description_override ?? `[could not load description for ${repo}]`}
      </p>
      <p style={styles.description} className="repo-inner-card dan-notes p-experience" dangerouslySetInnerHTML={{ __html: c.notes }} />
      <div style={styles.stats} className="repo-stats">
        <span style={styles.stat} className="pull-requests-list">
          <span className="gh-icon icon-github-pull-request"></span>
          {prList?.length >= 2 ?  prList?.length + " PRs" : "PR"}: {prList?.map((pr) => {
            return <a key={pr.number} href={pr.url} target="_blank" rel="noopener noreferrer" title={pr.title}><code>#{pr.number}</code></a>;
          })}
        </span>
        {/* <span style={styles.stat}>
          <span className="gh-icon icon-github-issue"></span>
          {pr?.repository.openIssues.toLocaleString()}
        </span>
        <span style={styles.stat}>
          <span className="gh-icon icon-github-eye"></span>
          {pr?.repository.watchers.toLocaleString()}
        </span> */}
      </div>
      <div style={styles.stats} className="pull-stats">
        <aside style={styles.stat} title="Changed files">
          <span className="gh-icon icon-github-file"></span>
          {pr?.pullStats.changedFiles}
        </aside>
        <aside style={styles.stat} title="Comments">
          <span className="gh-icon icon-github-comment"></span>
          {pr?.pullStats.comments}
        </aside>
        <aside style={styles.stat} title="Reviews">
          <span className="gh-icon icon-github-reviews"></span>
          {pr?.pullStats.reviews}
        </aside>
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
    fontSize: "1.35rem",
    fontWeight: "300",
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
    justifyContent: "space-between",
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
