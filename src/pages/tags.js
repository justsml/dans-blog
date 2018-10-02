import React from "react";
import PropTypes from "prop-types";

// Utilities
import kebabCase from "lodash/kebabCase";

// Components
import Main from "../components/Main/";
import Article from "../components/Main/Article";
// import Helmet from "react-helmet";
import Link from "gatsby-link";

const sortByKey = (key, arr, reverse = false) => {
  return [].concat(arr).sort((a, b) => (reverse ? a[key] - b[key] : b[key] - a[key]));
};

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title }
    }
  }
}) => {
  group = sortByKey("totalCount", group);
  return (
    <Main>
      {/* <Helmet title={title} /> */}
      <Article>
        <h1>Site Tags</h1>
        <ul>
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Article>
    </Main>
  );
};

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired
        }).isRequired
      )
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      })
    })
  })
};

export default TagsPage;

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
