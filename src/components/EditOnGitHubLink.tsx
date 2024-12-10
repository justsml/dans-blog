

/**
 * TODO: Make this component smarter, check for the existence of the file in the repo, find the full path with globbing, etc.
 * 
 * @param param0 
 * @returns 
 */
export function EditOnGitHubLink({
  repoUri,
  sourcePath,
}: {
  repoUri: string;
  sourcePath: string;
}) {
  const url = `${repoUri}/${sourcePath}`;
  return (
    <a
      className="edit-on-github"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        fontSize: "0.895rem",
        // color: "var(--color-text-muted)",
        padding: "0.5rem 0.5rem",
      }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span style={{color: 'var(--muted)'}}>Edit on GitHub</span>
      <img className="icon" src="/icons/github.svg" alt="GitHub" style={{
        width: ".8rem",
        height: ".8rem",
        // filter: "invert(0.5)",
      }} />
    </a>
  );
}
