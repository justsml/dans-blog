import React from "react";
import Link from "gatsby-link";
import Main from "../components/Main/";

import injectSheet from "react-jss";

const styles = theme => ({
  tagsList: {
    maxWidth: "50%",

    "& li": {
      maxWidth: "50%"
    },
    "& span": {
      float: "right"
    }
  }
});

const AllTags = ({
  data: {
    allMarkdownRemark: { group }
  },
  classes
}) => {
  // console.log("TAGS:", JSON.stringify(group));

  // const { tags } = pathContext;

  if (group) {
    return (
      <Main>
        <h1>Browse Tags</h1>

        <ul className={classes.tagsList}>
          {group.map(tag => {
            return (
              <li key={tag.fieldValue}>
                <Link data-count={tag.totalCount} to={`/tags/${tag.fieldValue}`}>
                  {tag.fieldValue}
                </Link>
                <span>{tag.totalCount}</span>
              </li>
            );
          })}
        </ul>
      </Main>
    );
  }
};

export default injectSheet(styles)(AllTags);

//eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query TagCountQuery {
    allMarkdownRemark(limit: 2000, filter: { frontmatter: { title: { ne: "" } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
