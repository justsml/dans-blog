import React from "react";
// import { useState } from "react";
import type { Contribution, UserPullRequestData } from "../../types.ts";
import clsx from "clsx";
// import { LineChangeIndicator } from "./LineChangeIndicator.tsx";
// import { Button } from "../ui/button.tsx";

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

  // const [showNotes, setShowNotes] = useState(false);
  // // Client side
  // const [repoData, _setRepoData] = useState<UserPullRequestData | undefined>(
  //   pr,
  // );

  const repoData: UserPullRequestData | undefined = pr;

  if (!repoData) {
    return <div>Loading...</div>;
  }

  return (
    <section
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
      <h2 style={styles.repoName} className="repo-name">
        <span className="gh-icon icon-github-octocat w-2 h-2"></span>
        <a
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          title={c.renamed ? `MOVED: ${c.renamed}` : repo}
          // style={styles.link}
          className="p-org"
        >
          {repo}
        </a>
      </h2>
      <section className="corner-stats">
        <aside title="Stars" className="stat">
          {pr?.repository.stars.toLocaleString()}
          <span className="gh-icon icon-github-star"></span>
        </aside>
        <aside title="Changed files" className="stat">
          {pr?.pullStats.changedFiles}
          <span className="gh-icon icon-github-file"></span>
        </aside>
        <aside title="Comments" className="stat">
          {pr?.pullStats.comments}
          <span className="gh-icon icon-github-comment"></span>
        </aside>
        <aside title="Reviews" className="stat">
          {pr?.pullStats.reviews}
          <span className="gh-icon icon-github-reviews"></span>
        </aside>
      </section>
      <p className="s-description repo-inner-card description">
        {c.description_override ?? `[could not load description for ${repo}]`}
      </p>

      {/* <Button
        variant={showNotes ? "default" : "outline"}
        className="s-button"
        onClick={() => setShowNotes(!showNotes)}
        aria-expanded={showNotes}
        aria-controls=".dan-notes"
      >
        {showNotes ? "Hide" : "Show"} my notes
      </Button>

      <p className={clsx("s-description repo-inner-card dan-notes p-experience border-[1px] bg-slate-200 drop-shadow-sm py-2 px-1 rounded-md", {
        'animate-card-stretch': !showNotes,
      })} dangerouslySetInnerHTML={{ __html: c.notes }} /> */}

      <div className="s-stats repo-stats">
        {/* <LineChangeIndicator additions={pr?.pullStats.additions} deletions={pr?.pullStats.deletions} /> */}

        <span className="s-stat pull-requests-list">
          <span className="gh-icon icon-github-pull-request"></span>
          {prList?.length >= 2 ? prList?.length + " PRs" : "PR"}:{" "}
          {prList?.map((pr) => {
            return (
              <a
                key={pr.number}
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                title={pr.title}
              >
                <code>#{pr.number}</code>
              </a>
            );
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
    </section>
  );
};

const styles = {
  card: {
    border: "1px solid #e1e4e8",
    borderRadius: ".3rem",
    padding: "1em",
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
  // link: {
  //   textDecoration: "none",
  //   color: "#0366d6",
  // },
  // description: {
  //   fontSize: "14px",
  //   color: "#586069",
  //   margin: "0 0 16px",
  // },
  // stats: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
  // stat: {
  //   display: "flex",
  //   alignItems: "center",
  //   marginRight: "16px",
  //   fontSize: "12px",
  //   color: "#586069",
  // },
  icon: {
    marginRight: "4px",
    width: "16px",
    height: "16px",
  },
};
