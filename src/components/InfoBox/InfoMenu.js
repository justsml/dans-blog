import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Link from "gatsby-link";

const styles = theme => ({
  infoMenu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    width: "100%"
  },
  link: {
    // width: "calc( 100% + 5px )",
    textAlign: "center",
    padding: ".5em",
    fontWeight: 300,
    textTransform: "lowercase",
    color: theme.info.colors.menuLink,
    borderRight: `5px solid transparent`,
    marginLeft: "5px",
    zIndex: "1000",
    // transition: "all .3s ease-in",
    "&:hover": {
      color: theme.info.colors.menuLinkHover
      // borderRight: `5px solid ${theme.info.colors.menuLinkHover}`
    }
  }
});

const hasMenuTitle = ({ node }) => node.frontmatter && node.frontmatter.menuTitle;

const InfoMenu = props => {
  const { classes, pages, linkOnClick } = props;

  return (
    <nav className={`${classes.infoMenu} pages-side-menu cl-effect-1`}>
      {pages.filter(hasMenuTitle).map((page, i) => {
        const { fields, frontmatter } = page.node;
        return (
          <Link
            key={fields.slug}
            to={fields.slug}
            onClick={linkOnClick}
            className={`${classes.link}`}
            data-shape="closed"
          >
            {frontmatter.menuTitle ? frontmatter.menuTitle : frontmatter.title}
          </Link>
        );
      })}
      {/* <Link to="/contact/" onClick={linkOnClick} className={classes.link} data-shape="closed">
        Contact
      </Link> */}
    </nav>
  );
};

InfoMenu.propTypes = {
  pages: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  linkOnClick: PropTypes.func.isRequired
};

export default injectSheet(styles)(InfoMenu);
