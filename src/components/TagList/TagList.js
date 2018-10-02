import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
// import Main from "../components/Main/";
import "../../styles/shared.css";

const TagList = ({ tags }) => {
  if (!tags || tags.length <= 0) return <span style={{ display: "none" }}>No tags</span>;

  return (
    <ul className={"tag-list"}>
      {tags.map(tag => {
        return (
          <li key={tag}>
            <Link to={`/tags/${tag}`}>{tag}</Link>
          </li>
        );
      })}
    </ul>
  );
};

TagList.propTypes = {
  tags: PropTypes.array
};


export default TagList;
