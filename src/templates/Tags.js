import React from "react";
import PropTypes from "prop-types";
import Main from "../components/Main/";
import Article from "../components/Main/Article";
// import "../styles/shared.css";
import injectSheet from "react-jss";
import { slugify } from "./../utils/helpers.js";
import distanceInWords from "date-fns/distance_in_words";

// Components
import Link from "gatsby-link";

const styles = theme => ({
  tagsList: {
    lineHeight: "1.5em",
    width: "100%",
    margin: "0 auto",
    listStyleType: "decimal",
    "& li": {
      cursor: "pointer",
      width: "90%",
      lineHeight: "1.95em",
      fontSize: "1.05em",
      "&:hover span": {
        backgroundColor: "#70942580",
        borderRadius: "20%"
      },
      "& span": {
        cursor: "pointer",
        transition: "all 0.25s ease-in",
        // textShadow: "1px 1px 1px #709425",
        backgroundColor: "#70942511",
        // theme.navigator.colors.postsListItemLinkHover,
        color: "#709425",
        height: "28px",
        width: "132px",
        textAlign: "right",
        fontWeight: 400,
        fontSize: "12.5px",
        borderRadius: "15%",
        padding: "0 8px 4px 8px"
      },
      "& a": {
        transition: "all 0.25s ease-in",
        cursor: "pointer",
        color: theme.navigator.colors.postsListItemLink,
        textDecoration: "underline",
        height: "28px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        margin: "2px 0",
        "&:hover": {
          color: theme.navigator.colors.postsListItemLinkHover
        }
      }
    }
  },
  headerLink: {
    "& a": {
      textDecoration: "none",
      color: theme.navigator.colors.postsListItemLink,
      "&:visited": {
        color: theme.navigator.colors.postsListItemLink
      },
      "&:hover": {
        color: theme.navigator.colors.postsListItemLinkHover
      }
    }
  }
});

const mergePostNode = ({ node }) => {
  return { ...node.fields, ...node.frontmatter };
};

const Tags = ({ pathContext, data, classes }) => {
  const { tagName } = pathContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"} tagged with "${tagName}"`;
  const nodes = edges.map(mergePostNode); //pathContext.posts;
  console.log("nodes:", nodes);

  return (
    <Main>
      <Article>
        <h1 className={classes.headerLink}>
          <Link to="/tags">Browse Tags</Link>
        </h1>
        <br />
        <h2>
          Posts tagged with: <i>{tagName}</i>
        </h2>

        <h4>{tagHeader}</h4>

        {nodes && (
          <ul className={classes.tagsList}>
            {nodes.map(node => {
              // console.log('tagging', post)
              const slugStr = node.slug.trim("/");
              // slugify
              return (
                <li key={node.slug}>
                  <Link to={`/${slugify(slugStr)}/`}>
                    <label>{node.title}</label>
                    <span>{distanceInWords(new Date(node.date), new Date())} ago</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <br />
        <br />
        <h3>
          <Link to="/tags">Back to All Tags</Link>
        </h3>
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
      sort: { fields: [frontmatter___date], order: DESC }
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
