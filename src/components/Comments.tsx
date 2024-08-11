import { useEffect, useRef } from "react";
import type { ArticlePost } from "../types";

export const GitHubIssueComments = ({ path }: { path: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.async = true;
      script.setAttribute("repo", "justsml/dans-blog");
      script.setAttribute("issue-term", "pathname");
      script.setAttribute("label", "💬 comment");
      script.setAttribute("theme", "preferred-color-scheme");
      script.setAttribute("crossorigin", "anonymous");

      script.onload = () => {
        const commentLoadingMsg = document.querySelector("#post-comments .loading-msg");
        if (commentLoadingMsg && commentLoadingMsg.parentNode)
          commentLoadingMsg.parentNode.removeChild(commentLoadingMsg);
      }

      const comment = ref.current;
      if (comment) comment.appendChild(script);
      return () => {
        try {
          if (comment && comment.contains(script)) comment.removeChild(script);
        } catch (e) {
          console.error(e);
        }
      };
    },
    [path]
  );
  /*
  .utterances-frame {
    position: relative;
    max-height: 70vh;
    overflow-y: auto;
    border: 0.5px solid #333;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;
     */
  return (
    <div
      ref={ref}
      id="post-comments"
      className="post-comments utterances-frame relative"
      // style={{
      //   maxHeight: "70vh",
      //   overflowY: "auto",
      //   border: "0.5px solid #333",
      //   margin: "1rem 0.25rem",
      //   padding: "0.5rem",
      //   borderRadius: "0.75rem"
      // }}
    >
      <span className="loading-msg">Loading comments...</span>
    </div>
  );
};

export const Comments = ({post}: {post: ArticlePost}) => {
  // const { post } = props || {};
  const key = post && post.slug && post.data.title;

  return <GitHubIssueComments path={key} />;
};

