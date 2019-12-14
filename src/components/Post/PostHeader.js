import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import TagList from "../TagList";
import injectSheet from "react-jss";
import Header from "../Header";
import LabelIcon from "@material-ui/icons/Label";

function fixDateString(str) {
  return typeof str === "string" && str.length === "yyyy-mm-DD".length ? str + "T00:00" : str;
}

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
    flexFlow: "row",
    lineHeight: "1.55",
    width: "100%",
    "& label": {
      opacity: "60%",
      fontWeight: "100"
    },
    "& b": {
      fontWeight: "300",
      opacity: "70%"
    },
    "& h3": {
      flexFlow: "column",
      width: "50%",
      display: "flex",
      justifyContent: "space-between",
      maxWidth: "300px",
      fontSize: "0.8em",
      margin: "0.2rem 0",
      // "& label": {
      //   width: "255px",
      //   fontSize: "11px",
      //   fontWeight: 700,
      //   marginRight: "4px"
      // },
      "& span.human-date": {
        width: "100%",
        fontSize: "0.8rem"
      },
      "& small": {
        width: "100%",
        fontSize: "0.8rem"
        // fontWeight: 700
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
  },
  tags: {
    transition: "all 0.75s ease-in",
    width: "100%",
    margin: "0.2rem 0",
    display: "inline-flex",
    alignItems: "baseline",
    justifyContent: "flex-start",
    "&:hover": {
      "& svg": {
        color: theme.base.colors.linkHover,
        opacity: "90%"
      }
    }
  },
  labelIcon: {
    transition: "all 0.75s ease-in",
    color: theme.bars.colors.icon,
    opacity: "60%",
    transform: "scale(0.88)",
    width: "1.2rem",
    flexShrink: 1,
    alignSelf: "center"
  },
  tagList: {
    flexGrow: 2,
    width: "100%"
  }
});

const getDateLabel = (date, modified) => {
  if (!date) return <span date={date} />;
  let updatedLabel = null;
  let modifiedDate = new Date(fixDateString(modified));
  if (modified) {
    updatedLabel = <div>updated {formatDistance(new Date(), modifiedDate)}&#160;ago</div>;
  }

  const aDate = new Date(fixDateString(date));
  return (
    <h3 className={"post-details text-left"}>
      <small title={`Updated on ${(modifiedDate || aDate).toLocaleDateString()}`}>
        <b>{updatedLabel}</b>
        <label>
          published&#160;{formatDistance(new Date(), aDate)}&#160;ago&#160;on&#160;
          {format(aDate, "MMM do, yyyy")}
        </label>
      </small>
    </h3>
  );
};

const PostHeader = props => {
  const { classes, date, modified, tags, allTags } = props;
  console.log("allTags", allTags);
  return (
    <Header {...props}>
      <div className={classes.meta}>{getDateLabel(date, modified)}</div>
      <div className={classes.tags} title="click a tag to explore similar content">
        <LabelIcon className={classes.labelIcon} />
        <TagList tags={tags} allTags={allTags} className={classes.tagList} />
      </div>
    </Header>
  );
};

PostHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  tags: PropTypes.array,
  modified: PropTypes.string,
  date: PropTypes.string.isRequired,
  allTags: PropTypes.object
};

export default injectSheet(styles)(PostHeader);
