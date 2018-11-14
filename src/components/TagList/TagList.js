import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
// import Main from "../components/Main/";
// import "../../styles/shared.css";
import injectSheet from "react-jss";

const styles = theme => ({
  tagList: {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    // justifyContent: "space-between",
    listStyle: "none",
    "& a": {
      fontSize: "11px",
      color: theme.base.colors.link,
      transition: "0.3s",
      "&:hover, &:visited, &:link": {
        color: theme.base.colors.linkHover
      }
    },
    "& h4": {
      fontSize: "11px",
      marginRight: "6px",
      margin: 0
    },
    "& > div": {
      fontSize: "11px",
      marginRight: "6px"
    },
    "> *": {
      display: "inline-flex"
    }
  }
});

const TagList = ({ tags, classes }) => {
  if (!tags || tags.length <= 0) return <span style={{ display: "none" }}>No tags</span>;

  return (
    <div className="tags-list">
      <div className={classes.tagList}>
        <h4>tags: </h4>
        {tags.map(tag => {
          return (
            <div key={tag}>
              <Link data-count={1} to={`/tags/${tag}`}>
                {tag}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

TagList.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array
};

export default injectSheet(styles)(TagList);
