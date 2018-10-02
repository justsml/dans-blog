import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import format from "date-fns/format";
import distanceInWords from "date-fns/distance_in_words";
import TagList from "../TagList";

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
    justifyContent: "space-between",
    flexFlow: "column wrap",
    "& h3": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      maxWidth: "55%",
      fontSize: "11px",
      margin: "0 0 4px 0",
      "& label": {
        width: "80px",
        fontSize: "11px",
        fontWeight: 700,
        marginRight: "4px"
      },
      "& span.human-date": {
        width: "80px"
      },
      "& small": {
        width: "100px",
        fontWeight: 700,
        marginLeft: "4px"
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

const getDateLabel = (date, label) => {
  if (!date) return <span date={date} />;

  const aDate = new Date(date);
  return (
    <h3>
      <label>{label} </label>
      <span className="human-date">{format(aDate, "MMM Do YYYY")}</span>
      <small>{distanceInWords(aDate, new Date())} ago</small>
    </h3>
  );
};
const PostHeader = props => {
  const { classes, title, subTitle, date, modified, tags } = props;
  // console.log("title", title, "post.props", props);

  function myDate(dateString) {
    const dateObj = new Date(dateString).toUTCString();
    const dateToShow = dateObj
      .split(" ")
      .slice(0, 4)
      .join(" ");

    return dateToShow;
  }

  return (
    <header className={classes.header}>
      <h1 className={classes.title}>{title}</h1>
      <h2 className={classes.subTitle}>{subTitle}</h2>
      <div className={classes.meta}>
        {getDateLabel(date, "published: ")}
        {getDateLabel(modified, "updated: ")}
      </div>
      <TagList tags={tags} />
    </header>
  );
};

PostHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  tags: PropTypes.array,
  modified: PropTypes.string,
  date: PropTypes.string.isRequired
};

export default injectSheet(styles)(PostHeader);
