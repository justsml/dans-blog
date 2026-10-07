import React from "react";
import { GitPullRequest, Star } from "lucide-react";
import type { Contribution, ContributionTag, UserPullRequestData } from "../../types.ts";
import { LineChangeIndicator } from "./LineChangeIndicator.tsx";

const TAG_CONFIG: Record<
  ContributionTag,
  { iconClass: string; color: string }
> = {
  "Node.js": { iconClass: "tech-icon-nodejs", color: "#417e38" },
  AI: { iconClass: "tech-icon-ai", color: "#7c3aed" },
  Python: { iconClass: "tech-icon-python", color: "#2b6db5" },
  Postgres: { iconClass: "tech-icon-postgresql", color: "#0e7490" },
  Docker: { iconClass: "tech-icon-docker", color: "#0369a1" },
  TypeScript: { iconClass: "tech-icon-typescript", color: "#1d4ed8" },
  React: { iconClass: "tech-icon-react", color: "#0891b2" },
  Testing: { iconClass: "tech-icon-testing", color: "#c17b2a" },
  Rust: { iconClass: "tech-icon-rust", color: "#9a3412" },
  Ruby: { iconClass: "tech-icon-ruby", color: "#be123c" },
};
export const RepoCard = ({ contribution: c, defaultPullData: pr }: {
  author: string;
  contribution: Contribution;
  defaultPullData?: UserPullRequestData;
}) => {
  if (!pr) return null;
  const pulls = pr.pullRequests ?? [];
  const latest = Math.max(0, ...pulls.map(p => new Date(p.mergedAt ?? p.createdAt).getTime()));
  const date = latest ? new Date(latest).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null;
  return (
    <article className="repo-card h-card" data-tags={(c.tags ?? []).join(",")}
      data-star-count={pr.repository.stars} data-last-pr-date={latest}>
      <header className="repo-card-github-header">
        <h2 className="repo-name"><GitPullRequest size={20} aria-hidden="true" />
          <a className="p-org" href={`https://github.com/${c.renamed ?? c.repo}`} target="_blank" rel="noopener noreferrer">{c.repo}</a>
        </h2>
        <div className="corner-stats">
          <span><Star size={14} aria-hidden="true" /> {pr.repository.stars.toLocaleString()} stars</span>
          {date && <span>Last PR <time dateTime={new Date(latest).toISOString()}>{date}</time></span>}
        </div>
      </header>
      <p className="s-description description">{c.description_override ?? pr.repository.description}</p>
      <div className="tech-tags">{(c.tags ?? []).map(tag => (
        <span className="tech-tag" key={tag} style={{ "--tag-color": TAG_CONFIG[tag].color } as React.CSSProperties}>
          <span className={`tech-tag-icon ${TAG_CONFIG[tag].iconClass}`} aria-hidden="true" />{tag}
        </span>
      ))}</div>
      {c.notes?.trim() && <details className="repo-notes">
        <summary>Contribution notes</summary>
        <div className="dan-notes" dangerouslySetInnerHTML={{ __html: c.notes }} />
      </details>}
      <details className="repo-pulls">
        <summary>{pulls.length.toLocaleString()} pull {pulls.length === 1 ? "request" : "requests"}</summary>
        <div className="pull-requests-list">{pulls.map(p => (
          <a key={p.number} href={p.url} target="_blank" rel="noopener noreferrer" title={p.title}>#{p.number}<span>{p.title}</span></a>
        ))}</div>
      </details>
      <footer className="pr-diff-stats"><span>Lines changed</span><LineChangeIndicator additions={pr.pullStats.additions} deletions={pr.pullStats.deletions} /></footer>
    </article>
  );
};
