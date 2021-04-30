import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

const styles = theme => ({
  article: {
    outline: "0px",
    // background: theme.main.colors.background,
    maxWidth: theme.main.sizes.articleMaxWidth,
    margin: "0 auto 0 auto",
    padding: `1.5rem 1.5rem 1.5rem 1.5rem`,
    "& strong, & b": {
      letterSpacing: "-.02em"
    },
    "& a": {
      fontWeight: "bold",
      letterSpacing: "-.02em",
      textDecoration: "underline",
      transition: "0.3s",
      "&:hover": {
        color: theme.base.colors.linkHover
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      padding: `1.5rem 3.5rem 2.5rem 3.5rem`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      padding: `1.5rem 3.5rem`
    }
  }
});

const Article = ({ children, classes }) => {
  return (
    <article tabIndex="-1" className={classes.article}>
      {children}
    </article>
  );
};

Article.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default injectSheet(styles)(Article);
