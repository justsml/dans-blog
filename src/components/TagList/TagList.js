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
    "& .badge": {
      color: "#555555",
      opacity: "60%",
      display: "inline-block",
      marginRight: "0.275rem"
    },
    "& a": {
      fontSize: "0.8rem",
      color: theme.base.colors.link,
      transition: "0.18s",
      opacity: "0.5",
      "&:hover, &:visited, &:link": {
        opacity: "0.5",
        color: theme.base.colors.linkHover
      },
      "&:hover": {
        opacity: "0.95"
      }
    },
    "& h4": {
      fontSize: "0.8rem",
      fontWeight: "300",
      marginRight: "6px",
      margin: 0
    },
    "& > div": {
      fontSize: "0.8rem",
      marginRight: "6px"
    },
    "> *": {
      display: "inline-flex"
    }
  }
});

function buildTagStats(allTags) {
  return (
    (allTags &&
      allTags.group.reduce((tagMap, item) => {
        const { fieldValue, totalCount } = item;
        tagMap[fieldValue] = totalCount;
        return tagMap;
      }, {})) ||
    {}
  );
}

const TagList = ({ tags, allTags, classes }) => {
  if (!tags || tags.length <= 0) return <span style={{ display: "none" }}>No tags</span>;
  const tagDict = buildTagStats(allTags);
  tags.sort((a, b) => (tagDict[a] === tagDict[b] ? 0 : tagDict[a] < tagDict[b] ? 1 : -1));

  return (
    <div className="tags-list">
      <div className={classes.tagList}>
        {tags.map(tag => {
          return (
            <div key={tag}>
              <Link
                data-count={1}
                to={`/tags/${tag}`}
                title={`see ${tagDict[tag]} posts related to ${tag}`}
              >
                {tag}
              </Link>{" "}
              <span className="badge">({tagDict[tag]})</span>
              {"  "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

TagList.propTypes = {
  classes: PropTypes.object.isRequired,
  allTags: PropTypes.object,
  tags: PropTypes.array
};

export default injectSheet(styles)(TagList);
