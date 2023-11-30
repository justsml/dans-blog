import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
// import FacebookProvider, { Comments } from "react-facebook";
// import { DiscussionEmbed } from "disqus-react";
// import config from "../../../content/meta/config";
// import asyncComponent from "../common/AsyncComponent";

// const DiscussionEmbedAsync = React.lazy(() =>
//   import("disqus-react").then(({ DiscussionEmbed }) => DiscussionEmbed)
// );
// const DiscussionEmbed = asyncComponent(() =>
//   import("disqus-react")
//     .then(module => {
//       return module.DiscussionEmbed;
//     })
//     .catch(error => {})
// );

const styles = theme => ({
  postComments: {
    margin: "3em 0 0",
    padding: "3em 0 0"
    // borderTop: "1px solid #ddd"
  }
});

// const COMMENTS_DELAY = 3000;

// eslint-disable-next-line react/prop-types
const GitHubIssueComments = ({ path }) => {
  const ref = React.useRef(null);
  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.async = true;
      script.setAttribute("repo", "justsml/dans-blog");
      script.setAttribute("issue-term", "pathname");
      script.setAttribute("label", "💬 comment");
      script.setAttribute("theme", "preferred-color-scheme"); // "photon-dark");
      script.setAttribute("crossorigin", "anonymous");
      const commentLoadingMsg = document.querySelector("#post-comments .loading-msg");
      if (commentLoadingMsg && commentLoadingMsg.parentNode)
        commentLoadingMsg.parentNode.removeChild(commentLoadingMsg);
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
      className="utterances-frame relative"
      style={{
        maxHeight: "70vh",
        overflowY: "auto",
        border: "0.5px solid #333",
        margin: "1rem 0.25rem",
        padding: "0.5rem",
        borderRadius: "0.75rem"
      }}
    >
      <span className="loading-msg">Loading comments...</span>
    </div>
  );
};

const PostComments = props => {
  const [showComments, setShowComments] = useState(false);
  const { classes, post } = props || {};
  const title = post && post.frontmatter && post.frontmatter.title;
  // const category = post && post.frontmatter && post.frontmatter.category;

  // const url = config.siteUrl + config.pathPrefix + slug;
  // const disqusConfig = {
  //   identifier: `${post && post.fields && post.fields.prefix}/${category}`,
  //   title: title || slug,
  //   url
  // };

  // eslint-disable-next-line no-undef
  const isSSR = typeof globalThis === "undefined";

  if (isSSR) return <div className="post-comments-ssr-placeholder post-comments" />;

  return <GitHubIssueComments path={title} />;
  // useEffect(() => {
  //   const t = setTimeout(setShowComments, COMMENTS_DELAY, true);
  //   return () => clearTimeout(t);
  // }, []);

  // return (
  //   <div id="post-comments" className={classes.postComments}>
  //     {showComments ? <GitHubIssueComments /> : "Loading comments..."}
  //   </div>
  // );
};

PostComments.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
  // facebook: PropTypes.object.isRequired
};

export default injectSheet(styles)(PostComments);
