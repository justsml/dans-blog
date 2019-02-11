import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Link from "gatsby-link";
import Button from "@material-ui/core/Button";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import avatar from "../../images/jpg/avatar.jpg";
import config from "../../../content/meta/config";

const styles = theme => ({
  header: {
    lineHeight: 1,
    position: "relative"
  },
  titleLink: {
    color: theme.info.colors.text,
    "& :link, :active ": {
      color: theme.info.colors.text
    },
    "&:hover": {
      color: theme.base.colors.linkHover
    }
  },
  avatarLink: {
    willChange: "left, top",
    float: "left",
    display: "block",
    position: "relative",
    margin: "0 12px 0 0",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 20px 0 0"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      position: "absolute",
      top: "10px",
      left: "50%",
      marginLeft: "-30px",
      transition: "all .5s",
      transitionTimingFunction: "ease",
      ".navigator-in-transition-from.navigator-is-opened &": {
        left: "50%"
      },
      ".is-aside.open &": {
        left: "8%",
        top: "0"
      }
    }
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "65% 75%",
    border: "1px solid #ddd",
    transition: "all .3s",
    transitionTimingFunction: "ease",
    display: "inline-block",
    overflow: "hidden",
    "& img": {
      maxWidth: "100%"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      width: "44px",
      height: "44px"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      width: "60px",
      height: "60px"
    },
    "@media (hover: hover)": {
      "&:hover": {
        borderRadius: "75% 65%"
      }
    }
  },
  title: {
    willChange: "transform, left, top",
    fontSize: `${theme.info.fonts.boxTitleSize}em`,
    margin: 0,
    float: "left",
    transitionTimingFunction: "ease",
    "& small": {
      display: "block",
      fontSize: ".6em",
      marginTop: ".3em",
      width: "140px"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      fontSize: `${theme.info.fonts.boxTitleSizeM}em`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      fontSize: `${theme.info.fonts.boxTitleSizeL}em`,
      position: "absolute",
      top: "85px",
      textAlign: "center",
      left: "50%",
      transform: "translate(-50%)",
      transition: "all .5s",
      ".is-aside.open &": {
        left: "60%",
        top: `${1.9 - theme.info.fonts.boxTitleSizeL}em`,
        textAlign: "left"
      }
    }
  },
  expand: {
    position: "absolute",
    top: "30px",
    right: "-25px",
    display: "none",
    color: theme.info.colors.text,
    ".is-aside.open &": {
      display: "block"
    }
  }
});

const InfoHeader = props => {
  const { classes, avatarOnClick, expandOnClick } = props;

  return (
    <header className={classes.header}>
      <Link className={classes.avatarLink} to="/" title="home page / all articles">
        <div className={classes.avatar}>
          <img src={avatar} alt="" />
        </div>
      </Link>
      <Link className={classes.titleLink} to="/" title="home page / all articles">
        <h1 className={classes.title}>
          {config.infoTitle.replace(/ /g, "\u00a0")}
          <small>{config.infoTitleNote}</small>
        </h1>
      </Link>
      <Button
        aria-label="show top menu"
        className={classes.expand}
        onClick={expandOnClick}
        title="show top menu"
      >
        <ExpandMoreIcon />
      </Button>
    </header>
  );
};

InfoHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  avatarOnClick: PropTypes.func.isRequired,
  expandOnClick: PropTypes.func.isRequired
};

export default injectSheet(styles)(InfoHeader);
