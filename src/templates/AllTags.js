import React from "react";
import Link from "gatsby-link";
import Main from "../components/Main/";
import PropTypes from "prop-types";
import { slugify } from "./../utils/helpers.js";
import "../styles/shared.css";
import injectSheet from "react-jss";
import Article from "../components/Main/Article";
import Header from "../components/Header";

const styles = theme => ({
  tagsList: {
    lineHeight: "1.5em",
    width: "100%",
    margin: "0 auto",
    listStyleType: "none",
    "& li": {
      cursor: "pointer",
      width: "85%",
      lineHeight: "1.95em",
      fontSize: "1.05em",
      "&:hover span": {
        backgroundColor: "rgba(112, 148, 37, 0.52)",
        borderRadius: "100%",
        color: "#333 !important"
      },
      "& span": {
        transition: "all 0.33s ease-in",
        backgroundColor: "rgba(112, 148, 37, 0)",
        // theme.navigator.colors.postsListItemLinkHover,
        color: "#dddddd",
        height: "28px",
        width: "28px",
        textAlign: "center",
        fontWeight: 900,
        borderRadius: "25%"
      },
      "& a": {
        overflow: "hidden",
        cursor: "pointer",
        color: theme.navigator.colors.postsListItemLink,
        textDecoration: "none",
        height: "30px",
        display: "flex",
        justifyContent: "space-between",
        margin: "2px 0",
        "&:hover": {
          color: theme.navigator.colors.postsListItemLinkHover
        },
        "& label": {
          textShadow: "0.1px 0.1px 0.125px #00000080"
        }
      }
    }
    // "& span": {
    //   float: "right"
    // }
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
    sortBy: "totalCount" //"fieldValue"
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
            <Header title="Search Site Tags" subTitle="Articles organized by tags">
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
            </Header>

            <ul className={classes.tagsList}>
              {tagsList.map(tag => {
                return (
                  <li key={tag.fieldValue}>
                    <Link data-count={tag.totalCount} to={`/tags/${slugify(tag.fieldValue)}`}>
                      <label>{tag.fieldValue}</label>
                      <span
                        title={`${tag.fieldValue}: ${tag.totalCount}`}
                        style={{
                          color: parseInt(tag.totalCount) >= 2 ? "#333" : "#999",
                          fontSize:
                            parseInt(tag.totalCount) >= 6
                              ? "1.7em"
                              : parseInt(tag.totalCount) >= 3
                                ? "1.5em"
                                : parseInt(tag.totalCount) >= 2
                                  ? "1.3em"
                                  : "1.1em",
                          fontWeight: parseInt(tag.totalCount) >= 2 ? 700 : 400
                        }}
                      >
                        {tag.totalCount}
                      </span>
                    </Link>
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
