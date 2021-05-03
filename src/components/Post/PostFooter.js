import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

import asyncComponent from "../common/AsyncComponent/";
import PostAuthor from "./PostAuthor";
// import PostComments from "./PostComments";

const styles = theme => ({
  footer: {
    color: theme.main.colors.footer,
    fontSize: `${theme.main.fonts.footer.size}em`,
    lineHeight: theme.main.fonts.footer.lineHeight,
    "& p": {
      margin: 0
    }
  }
});

const PostShare = asyncComponent(() =>
  import("./PostShare")
    .then(module => {
      return module;
    })
    .catch(error => {})
);

const PostComments = asyncComponent(() =>
  import("./PostComments")
    .then(module => {
      return module;
    })
    .catch(error => {})
);

const PostFooter = ({ classes, author, post, slug }) => {
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const handler = event => cleanup() && setShowComments(true);
    const cleanup = () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("mousemove", handler);
    };
    window.addEventListener("click", handler);
    window.addEventListener("mousemove", handler);
    return cleanup;
  }, []);

  return (
    <footer className={classes.footer}>
      {showComments && <PostShare post={post} slug={slug} />}
      <PostAuthor author={author} />
      {showComments && <PostComments post={post} slug={slug} author={author} />}
    </footer>
  );
};

PostFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired
  // facebook: PropTypes.object.isRequired
};

export default injectSheet(styles)(PostFooter);
