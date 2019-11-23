import React, { Component } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { AppBar } from "@material-ui/core";

const styles = theme => ({
  container: {
    // position: "fixed",
    width: "100%",
    maxHeight: "2rem",
    top: "auto",
    bottom: 0,
    borderTop: "0.85px solid #333",
    background: "#fff",
    color: "#333333", //theme.footer.colors.text,
    textAlign: "center",
    fontSize: `1.25rem`,
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

class Score extends Component {
  state = {
    score: 0,
    totalAvailable: 0
  };

  constructor(props) {
    super(props);
    this.updateScores();
  }

  componentDidMount() {
    this.timer = setInterval(this.updateScores, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateScores = () => {
    const challenges = document.querySelectorAll(`.challenge-block`);
    const correctChallenges = document.querySelectorAll(`.challenge-correct`);
    console.log(
      `challenges.length`,
      challenges.length,
      `correctChallenges`,
      correctChallenges.length
    );
    this.setState({ score: correctChallenges.length, totalAvailable: challenges.length });
  };

  render() {
    const { classes, reset } = this.props;
    const { score = 0, totalAvailable = -1 } = this.state;

    if (totalAvailable <= 0) return <div />;

    return (
      <AppBar position="fixed" color="primary" className={classes.container}>
        Your current score is {score} out of {totalAvailable}
      </AppBar>
    );
  }
}

Score.propTypes = {
  classes: PropTypes.object.isRequired,
  score: PropTypes.number,
  totalAvailable: PropTypes.number,
  reset: PropTypes.func
};

export default injectSheet(styles)(Score);
