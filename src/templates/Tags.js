import React from "react";
import PropTypes from "prop-types";
import Main from "../components/Main/";
import Article from "../components/Main/Article";
import Header from "../components/Header";
// import "../styles/shared.css";
import injectSheet from "react-jss";
import { slugify } from "./../utils/helpers.js";
import distanceInWords from "date-fns/distance_in_words";

// Components
import Link from "gatsby-link";

const styles = theme => ({
  tagsList: {
    lineHeight: "1.25em",
    width: "100%",
    margin: "0 auto",
    listStyleType: "decimal",
    "& li": {
      cursor: "pointer",
      width: "90%",
      lineHeight: "1.75em",
      fontSize: "1.05em",
      marginBottom: "10px",
      "&:hover span": {
        cursor: "pointer",
        backgroundColor: "#70942580",
        borderRadius: "10%"
      },
      "& span": {
        alignItems: "center",
        display: "flex",
        justifyContent: "center", // "flex-end", //"space-between",
        cursor: "pointer",
        transition: "all 0.25s ease-in",
        // textShadow: "1px 1px 1px #709425",
        backgroundColor: "#70942511",
        // theme.navigator.colors.postsListItemLinkHover,
        color: "#709425",
        height: "28px",
        minWidth: "132px",
        // textAlign: "right",
        fontWeight: 400,
        fontSize: "12.5px",
        borderRadius: "2%",
        margin: "6px",
        padding: "0 6px"
      },
      "& label": {
        lineHeight: "1.28em"
      },
      "& a": {
        lineHeight: "1.2em",
        transition: "all 0.25s ease-in",
        cursor: "pointer",
        color: theme.navigator.colors.postsListItemLink,
        textDecoration: "underline",
        minHeight: "28px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        margin: "2px 0",
        "& :hover": {
          cursor: "pointer",
          color: theme.navigator.colors.postsListItemLinkHover
        }
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
        width: "100%"
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        width: "95%"
      }
    }
  },
  headerLink: {
    width: "100%",
    "& a": {
      width: "100%",
      margin: "0 auto",
      textAlign: "center",
      display: "inline-block",
      textDecoration: "underline",
      color: theme.navigator.colors.postsListItemLink,
      "&:visited": {
        color: theme.navigator.colors.postsListItemLink
      },
      "&:hover": {
        color: theme.navigator.colors.postsListItemLinkHover,
        textDecoration: "underline"
      }
    }
  }
});

const mergePostNode = ({ node }) => {
  return { ...node.fields, ...node.frontmatter };
};

const Tags = ({ pathContext, data, classes }) => {
  const { tagName } = pathContext;
  const { edges, totalCount } = data.allMarkdownRemark || { edges: [], totalCount: -1 };
  const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"} tagged with "${tagName}"`;
  const nodes = edges.map(mergePostNode); //pathContext.posts;
  // console.log("nodes:", nodes);

  return (
    <Main>
      <Article>
        <Header title="Tags Browser" subTitle={`Tag: ${tagName}`} />

        {nodes && (
          <ul className={classes.tagsList}>
            {nodes.map(node => {
              // console.log('tagging', post)
              const slugStr = node.slug.trim("/");
              const createdAgo = distanceInWords(new Date(node.date), new Date());
              const modifiedAgo = distanceInWords(new Date(node.modified || node.date), new Date());
              // slugify
              return (
                <li key={node.slug}>
                  <Link to={`/${slugify(slugStr)}/`}>
                    <label title={node.subTitle}>{node.title}</label>
                    <span title={`Created ${createdAgo} ago\nLast Modified ${modifiedAgo} ago`}>
                      {modifiedAgo} ago
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <h3 className={classes.headerLink}>
          <Link to="/tags/">Back / View All Tags</Link>
        </h3>
        <br />
        <br />
      </Article>
    </Main>
  );
};

Tags.propTypes = {
  classes: PropTypes.object.isRequired,
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              slug: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired
            })
          })
        }).isRequired
      )
    })
  })
};

export default injectSheet(styles)(Tags);
// export default Tags;

//eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query TagPage($tagName: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date, frontmatter___modified], order: DESC }
      filter: { frontmatter: { tags: { in: [$tagName] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            subTitle
            date
            modified
            category
          }
        }
      }
    }
  }
`;
