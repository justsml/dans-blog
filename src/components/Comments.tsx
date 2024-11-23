import { useEffect, useRef } from "react";
import type { ArticlePost } from "../types";

export const GitHubIssueComments = ({ path }: { path: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(
    () => {
      // const commentsFrame = document.querySelectorAll(".utterances-frame");
      // const $postComments = document.querySelector("#post-comments");
      // if (commentsFrame) {
      //   console.log("Comments already loaded, skipping...", path);
      //   return;
      // }
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
        const doc = window?.document;
        console.log('Comments count:', doc?.querySelectorAll(".utterances-frame"));
          const comment = ref.current;
        try {
          if (comment && comment.contains(script)) comment.removeChild(script);
          if (doc?.querySelectorAll(".utterances-frame").length) {
            doc?.querySelectorAll(".utterances-frame").forEach((el) => el.remove());
          }
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
}
     */
  return (
    <div
      ref={ref}
      id="post-comments"
      style={{position: "relative"}}
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

