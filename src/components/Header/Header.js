import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

const styles = theme => ({
  header: {
    margin: "0 0 3em"
  },
  title: {
    color: theme.main.colors.title,
    fontSize: `${theme.main.fonts.title.size}em`,
    letterSpacing: "-0.04em",
    fontWeight: theme.main.fonts.title.weight,
    lineHeight: theme.main.fonts.title.lineHeight,
    margin: "0 0 0.4em",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      fontSize: `${theme.main.fonts.title.sizeM}em`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      fontSize: `${theme.main.fonts.title.sizeL}em`,
      letterSpacing: "-0.05em"
    }
  },
  subTitle: {
    color: theme.main.colors.subTitle,
    fontSize: `${theme.main.fonts.subTitle.size}em`,
    lineHeight: theme.main.fonts.subTitle.lineHeight,
    fontWeight: theme.main.fonts.subTitle.weight,
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      fontSize: `${theme.main.fonts.subTitle.sizeM}em`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      fontSize: `${theme.main.fonts.subTitle.sizeL}em`
    }
  },
  meta: {
    display: "flex",
    justifyContent: "flex-end",
    flexFlow: "row",
    lineHeight: "1.55",
    width: "100%",
    "& h3": {
      flexFlow: "column",
      width: "100px",
      display: "flex",
      justifyContent: "space-between",
      maxWidth: "300px",
      fontSize: "11px",
      margin: "0 0 4px 0",
      "& label": {
        width: "100px",
        fontSize: "11px",
        fontWeight: 700,
        marginRight: "4px"
      },
      "& span.human-date": {
        width: "100px"
      },
      "& small": {
        width: "100px",
        fontWeight: 700
        // marginLeft: "4px"
      }
    },
    "& a": {
      color: theme.base.colors.link,
      "&:hover": {
        color: theme.base.colors.linkHover
      }
    },
    fontSize: `${theme.main.fonts.meta.size}em`,
    fontWeight: theme.main.fonts.meta.weight,
    color: theme.main.colors.meta
  }
});

class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    tags: PropTypes.array,
    modified: PropTypes.string,
    date: PropTypes.string.isRequired,
    children: PropTypes.array
  };

  render() {
    const { classes, title, subTitle, date, modified, tags, children } = this.props;
    return (
      <header className={classes.header}>
        <h1 className={classes.title}>{title}</h1>
        <h2 className={classes.subTitle}>{subTitle}</h2>
        {children}
      </header>
    );
  }
}

export default injectSheet(styles)(Header);
