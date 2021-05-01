import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import TagList from "../TagList";
import injectSheet from "react-jss";
import Header from "../Header";
import LabelIcon from "@material-ui/icons/Label";
import CalendarIcon from "@material-ui/icons/Event";

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
    display: "grid",
    gridTemplateColumns: "30px auto",

    // justifyContent: "space-between",
    // flexFlow: "row",
    lineHeight: "1.55",
    width: "100%",
    "& svg": {
      width: "1.5rem",
      height: "1.5rem",
      margin: "0.2rem",
      color: theme.base.colors.linkHover
    },
    "& label": {
      // opacity: "90%",
      fontWeight: "100"
    },
    "& b": {
      fontWeight: "300"
      // opacity: "80%"
    },
    "& h3": {
      flexFlow: "column",
      width: "50%",
      display: "flex",
      justifyContent: "space-between",
      maxWidth: "300px",
      fontSize: "0.85rem",
      margin: "0.2rem 0",
      // "& label": {
      //   width: "255px",
      //   fontSize: "11px",
      //   fontWeight: 700,
      //   marginRight: "4px"
      // },
      "& span.human-date": {
        width: "100%",
        fontSize: "0.85rem"
      },
      "& small": {
        width: "100%",
        fontSize: "0.85rem"
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
    color: theme.main.colors.meta,
    "&:hover": {
      "& svg": {
        color: theme.base.colors.linkHover
        // opacity: "95%"
      }
    }
  },
  tags: {
    transition: "all 0.75s ease-in",
    width: "100%",
    margin: "0.2rem 0",
    display: "grid",
    gridTemplateColumns: "30px auto",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    "&:hover": {
      "& svg": {
        color: theme.base.colors.linkHover
        // opacity: "95%"
      }
    }
  },
  tagsIcon: {
    "& svg": {
      width: "1.5rem",
      height: "1.5rem",
      // color: theme.bars.colors.icon,
      maxWidth: "21px"
    },
    transition: "all 0.75s ease-in",
    width: "2rem",
    height: "1.5rem",
    color: theme.bars.colors.icon,
    // flexShrink: 1,
    alignSelf: "center",
    display: "flex",
    placeSelf: "center",
    gridTemplateColumns: "30px auto",
    alignContent: "center",
    justifyContent: "center"
  },
  metaIcon: {
    "& svg": {
      color: theme.bars.colors.icon,
      maxWidth: "24px"
    },
    placeSelf: "center",
    width: "2rem",
    height: "1.5rem",
    color: theme.bars.colors.icon,
    // opacity: "95%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center"
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
  // console.log("allTags", allTags);
  return (
    <Header {...props}>
      <div className={classes.meta}>
        <div className={`${classes.metaIcon} icon-box`}>
          <CalendarIcon />
        </div>
        {getDateLabel(date, modified)}
      </div>
      <div className={classes.tags} title="click a tag to explore similar content">
        <div className={`${classes.tagsIcon} icon-box`}>
          <LabelIcon />
        </div>
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
