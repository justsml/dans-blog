import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { AppBar } from "@material-ui/core";

const styles = theme => ({
  container: {
    position: "fixed",
    width: "50rem",
    bottom: 0,
    border: "3px solid #333",
    background: "#DEDEDE",
    color: "#333333", //theme.footer.colors.text,
    textAlign: "center",
    fontSize: `${theme.footer.fonts.footnote.size}em`,
    lineHeight: theme.footer.fonts.footnote.lineHeight,
    "& a": {
      color: theme.footer.colors.link,
      fontWeight: "normal",
      textShadow: "none"
    },
    "& a:hover": {
      color: theme.footer.colors.linkHover
    }
  }
});

function Score({ classes, reset, score = 0, totalAvailable = -1 }) {
  if (totalAvailable <= 0) return <div />;

  return (
    <AppBar position="bottom">
      Your current score is {score} out of {totalAvailable}
    </AppBar>
  );
}

Score.propTypes = {
  classes: PropTypes.object.isRequired,
  score: PropTypes.number,
  totalAvailable: PropTypes.number,
  reset: PropTypes.func
};

export default injectSheet(styles)(Score);
