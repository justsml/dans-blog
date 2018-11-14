import React from "react";
import Link from "gatsby-link";
import Main from "../components/Main/";
import PropTypes from "prop-types";
import { slugify } from "./../utils/helpers.js";
import "../styles/shared.css";
import injectSheet from "react-jss";
import Article from "../components/Main/Article";

const styles = theme => ({
  tagsList: {
    lineHeight: "1.5em",
    width: "100%",
    margin: "0 auto",
    "& li": {
      cursor: "pointer",
      width: "85%",
      lineHeight: "1.95em",
      listStyle: "none",
      fontSize: "1.05em",
      "&:hover span": {
        backgroundColor: "#70942580",
        borderRadius: "20%"
      },
      "& span": {
        transition: "all 0.25s ease-in",
        textShadow: "1px 1px 1px #709425",
        backgroundColor: "#70942540",
        // theme.navigator.colors.postsListItemLinkHover,
        color: "#ffffff",
        height: "28px",
        width: "28px",
        textAlign: "center",
        fontWeight: 900,
        borderRadius: "100%"
      },
      "& a": {
        color: theme.navigator.colors.postsListItemLink,
        textDecoration: "none",
        "&:hover": {
          color: theme.navigator.colors.postsListItemLinkHover
        }
      }
    },
    "& span": {
      float: "right"
    }
  },
  sortButtons: {
    // maxWidth: "35%",
    margin: "0.35em 0",
    display: "flex",
    justifyContent: "space-evenly",
    fontSize: "1.25em",
    "& button": {
      cursor: "pointer"
    }
  }
});

class AllTags extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    sortBy: "fieldValue"
  };

  render() {
    const {
      data: {
        allMarkdownRemark: { group }
      },
      classes
    } = this.props;

    if (group) {
      const tagsList = [].concat(group).sort((a, b) => b[this.state.sortBy] - a[this.state.sortBy]);

      return (
        <Main>
          <Article>
            <h1>Browse Tags</h1>

            <div className={classes.sortButtons}>
              <button onClick={() => this.setState({ sortBy: "fieldValue" })}>
                <b>Sort:</b> Name
                {this.state.sortBy === "fieldValue" && " ✅"}
              </button>
              <button onClick={() => this.setState({ sortBy: "totalCount" })}>
                <b>Sort:</b> Count
                {this.state.sortBy === "totalCount" && " ✅"}
              </button>
            </div>

            <ul className={classes.tagsList}>
              {tagsList.map(tag => {
                return (
                  <li key={tag.fieldValue}>
                    <Link data-count={tag.totalCount} to={`/tags/${slugify(tag.fieldValue)}`}>
                      {tag.fieldValue}
                    </Link>
                    <span
                      style={{
                        color: parseInt(tag.totalCount) >= 2 ? "#555" : "#fff",
                        fontSize: parseInt(tag.totalCount) >= 2 ? "1.4em" : "1.1em"
                      }}
                    >
                      {tag.totalCount}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Article>
        </Main>
      );
    }
    return <h3 className={classes.error}>ERROR: Failed to find tag counts!</h3>;
  }
}

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
