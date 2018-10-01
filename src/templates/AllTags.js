import React from "react";
import Link from "gatsby-link";
import Main from "../components/Main/";

const AllTags = ({ pathContext }) => {
  const { tags } = pathContext;

  if (tags) {
    return (
      <Main>
        <ul>
          {tags.map(tag => {
            return (
              <li key={tag}>
                <Link to={`/tags/${tag}`}>{tag}</Link>
              </li>
            );
          })}
        </ul>
      </Main>
    );
  }
};

export default AllTags;
