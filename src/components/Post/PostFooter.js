import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

// import asyncComponent from "../common/AsyncComponent/";
import PostAuthor from "./PostAuthor";
import PostComments from "./PostComments";
import PostShare from "./PostShare";

const styles = theme => ({
  footer: {
    color: theme.main.colors.footer,
    fontSize: `${theme.main.fonts.footer.size}em`,
    lineHeight: theme.main.fonts.footer.lineHeight,
    "& p": {
      margin: 0
    }
  },
  footnote: {
    textAlign: "center",
    margin: "1em 0 0",
    fontSize: `${theme.main.fonts.footer.size}em`,
    lineHeight: theme.main.fonts.footer.lineHeight,
    color: theme.main.colors.footer,
    "& a": {
      color: theme.main.colors.link,
      fontWeight: "normal",
      textShadow: "none"
    },
    "& a:hover": {
      color: theme.main.colors.linkHover
    },
    "& ul": {
      listStyle: "none",
      margin: 0,
      padding: 0,
      textAlign: "center"
    },
    "& li": {
      display: "inline-block",
      margin: "0 .3em"
    }
  }
});

// const PostShare = asyncComponent(() =>
//   import("./PostShare")
//     .then(module => {
//       return module;
//     })
//     .catch(error => {})
// );

// const PostComments = asyncComponent(() =>
//   import("./PostComments")
//     .then(module => {
//       return module;
//     })
//     .catch(error => {})
// );

const PostFooter = ({ classes, author, post, slug, footnote }) => {
  return (
    <footer className={classes.footer}>
      <PostShare post={post} slug={slug} />
      <PostAuthor author={author} />
      <div className={classes.footnote} dangerouslySetInnerHTML={{ __html: footnote }} />
      <PostComments post={post} slug={slug} author={author} />
    </footer>
  );
};

PostFooter.propTypes = {
  footnote: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired
  // facebook: PropTypes.object.isRequired
};

export default injectSheet(styles)(PostFooter);
