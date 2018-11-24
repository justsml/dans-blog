import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import LazyLoad from "react-lazyload";
import format from "date-fns/format";
import distanceInWords from "date-fns/distance_in_words";

const getDateLabel = (date, label, className = "text-left") => {
  if (!date) return <span date={date} />;

  const aDate = new Date(date);
  const lblClass = label.replace(/[^\w]*/gi, "");
  return (
    <h3 className={"list-item " + lblClass + " " + className}>
      <small className={className}>
        {label}&#160;{distanceInWords(aDate, new Date())}&#160;ago
      </small>
      <span className="human-date">{format(aDate, "MMM Do, YYYY")}</span>
    </h3>
  );
};

const styles = theme => ({
  listItem: {
    margin: "0 0 .7em 0",
    transition: "height 1s",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 0 1.5rem 0"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      ".moving-featured &, .is-aside &": {
        margin: "0 0 0 0"
      }
    }
  },
  listLink: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: ".7em 1em .7em 1em",
    color: theme.navigator.colors.postsListItemLink,
    transition: "all .35s",
    "@media (hover: hover)": {
      "&:hover": {
        color: theme.navigator.colors.postsListItemLinkHover,
        "& .pointer": {
          borderRadius: "100%"
        }
      }
    }
  },
  listItemPointer: {
    position: "relative",
    flexShrink: 0,
    overflow: "hidden",
    borderRadius: "100%",
    width: "60px",
    height: "60px",
    margin: "0",
    transition: "all .5s",
    "& img": {
      width: "100%",
      height: "100%"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      marginRight: ".5em",
      width: "80px",
      height: "80px"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      marginRight: ".8em",
      width: "90px",
      height: "90px",
      transition: "all .3s",
      transitionTimingFunction: "ease-in",
      ".moving-featured &, .is-aside &": {
        width: "30px",
        height: "30px"
      }
    }
  },
  listItemText: {
    margin: "0 0 0 1.5em",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "& h1": {
      lineHeight: 1.15,
      fontWeight: 600,
      letterSpacing: "-0.03em",
      margin: 0,
      fontSize: `${theme.navigator.sizes.postsListItemH1Font}em`,
      [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH1Font *
          theme.navigator.sizes.fontIncraseForM}em`
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH1Font *
          theme.navigator.sizes.fontIncraseForL}em`,
        ".moving-featured &, .is-aside &": {
          fontSize: "1em",
          fontWeight: 400
        }
      }
    },
    "& h3, h4": {
      lineHeight: 1.2,
      fontSize: "0.8em",
      width: "30%",
      display: "inline-block",
      "& small, label": {
        fontWeight: 700
      },
      // [`@media (min-width: ${theme.mediaQueryTresholds.S}px)`]: {
      //   width: "50%",
      //   fontSize: "0.75em"
      // },
      [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
        width: "50%",
        fontSize: "0.85em"
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        fontSize: "0.85",
        ".moving-featured &, .is-aside &": {
          display: "none"
        }
      }
    },
    "& h2": {
      lineHeight: 1.2,
      display: "block",
      fontSize: `${theme.navigator.sizes.postsListItemH2Font}em`,
      margin: ".3em 0",
      [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH2Font *
          theme.navigator.sizes.fontIncraseForM}em`
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH2Font *
          theme.navigator.sizes.fontIncraseForL}em`,
        ".moving-featured &, .is-aside &": {
          display: "none"
        }
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      ".moving-featured &, .is-aside &": {
        margin: "0 0 0 .5em"
      }
    }
  },
  extraDetails: {
    display: "flex",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      fontSize: `0.8em`
    },
    "& h3": {
      minWidth: "40%",
      display: "flex",
      flexDirection: "column"
    }
  },
  metaInfo: {
    display: "flex",
    justifyContent: "space-between",
    flexFlow: "row wrap",
    margin: "0.33em 0",
    "& h3": {
      flexFlow: "column",
      width: "50%",
      display: "inline-flex",
      justifyContent: "space-between",
      maxWidth: "300px",
      fontSize: "1.2em",
      margin: "0.25em 0",
      // "& label": {
      //   width: "250px",
      //   fontSize: "1.2em",
      //   fontWeight: 700,
      //   marginRight: "4px"
      // },
      "& span.human-date": {
        fontWeight: 300,
        width: "100%"
      },
      "& small": {
        fontWeight: 300,
        fontSize: "0.75em",
        width: "100%",
        margin: "0 0 0.25em 0"
      }
    },
    [`@media (max-width: ${theme.mediaQueryTresholds.M}px)`]: {
      "& span.human-date": {
        display: "none"
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      "& span.human-date": {
        fontWeight: 300,
        width: "250px",
        fontSize: "0.45em"
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      display: "inherit",
      "& span.human-date": {
        fontWeight: 300,
        width: "250px",
        fontSize: "0.65em"
      },
      "& label": {
        display: "inherit"
      },
      "& small": {
        display: "inherit"
      }
    }
  }
});

class ListItem extends React.Component {
  state = {
    hidden: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categoryFilter !== this.props.categoryFilter) {
      const category = this.props.post.node.frontmatter.category;
      const categoryFilter = this.props.categoryFilter;

      if (categoryFilter === "all posts") {
        this.setState({ hidden: false });
      } else if (category !== categoryFilter) {
        this.setState({ hidden: true });
      } else if (category === categoryFilter) {
        this.setState({ hidden: false });
      }
    }
  }

  render() {
    const { classes, post, linkOnClick } = this.props;
    const date = post.node.frontmatter && post.node.frontmatter.date;
    const modified = post.node.frontmatter && post.node.frontmatter.modified;

    return (
      <li
        className={`${classes.listItem} ${post.node.frontmatter.category}`}
        style={{ display: `${this.state.hidden ? "none" : "block"}` }}
        key={post.node.fields.slug}
      >
        <Link
          activeClassName="active"
          className={classes.listLink}
          to={post.node.fields.slug}
          onClick={linkOnClick}
        >
          {post.node.frontmatter.cover &&
            post.node.frontmatter.cover.children[0] && (
              <div className={`${classes.listItemPointer} pointer`}>
                <LazyLoad height={60} overflow={true} throttle={300} once={true} offset={100}>
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={post.node.frontmatter.cover.children[0].resolutions.srcSetWebp}
                    />
                    <source srcSet={post.node.frontmatter.cover.children[0].resolutions.srcSet} />
                    <img src={post.node.frontmatter.cover.children[0].resolutions.src} alt="" />
                  </picture>
                </LazyLoad>
              </div>
            )}
          <div className={classes.listItemText}>
            <h1>{post.node.frontmatter.title}</h1>
            {post.node.frontmatter.subTitle && <h2>{post.node.frontmatter.subTitle}</h2>}
            <div className={classes.metaInfo}>
              {getDateLabel(date, "published", "text-left")}
              {getDateLabel(modified, "updated", "text-left")}
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  linkOnClick: PropTypes.func.isRequired,
  categoryFilter: PropTypes.string.isRequired
};

export default injectSheet(styles)(ListItem);
