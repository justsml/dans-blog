/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";
import Tada from "react-reveal/Tada";
import Bounce from "react-reveal/Bounce";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { AppBar } from "@material-ui/core";
import { TwitterIcon } from "react-share";
// import TwitterIcon from "@material-ui/icons/Twitter";
import RefreshIcon from "@material-ui/icons/RefreshOutlined";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { shareOnTwitter } from "../../utils/helpers.js";

const getScoreIcon = (score, totalAvailable) => {
  if (score <= 1)
    return <SentimentDissatisfiedIcon className="grademoji" fontSize="inherit" color="action" />;
  if (score <= 3)
    return <SentimentSatisfiedIcon className="grademoji" fontSize="inherit" color="action" />;
  if (score <= 6)
    return <SentimentSatisfiedAltIcon className="grademoji" fontSize="inherit" color="action" />;
  if (score === totalAvailable)
    return <SentimentVerySatisfiedIcon className="grademoji" fontSize="inherit" />;
  return <SentimentDissatisfiedIcon className="grademoji" fontSize="inherit" color="disabled" />;
};

const styles = theme => {
  console.log("theme.mediaQueryTresholds", theme.mediaQueryTresholds);
  return {
    container: {
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      // position: "fixed",
      width: "100%",
      maxHeight: "3rem",
      top: "auto",
      bottom: 0,
      borderTop: "0.85px solid #333",
      // background: "#fff",
      // color: "#333333", //theme.footer.colors.text,
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
    },
    flexBar: {
      // margin: "0.1rem 0 0.6rem 0",
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "space-around",
      height: "100%",
      minWidth: "55vw",
      [`@media (max-width: ${theme.mediaQueryTresholds.M}px)`]: {
        justifyContent: "space-between",
        width: "100%"
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        // width: "95%"
      },
      padding: "0.3rem 1rem",
      // flexFlow: "row wrap",
      // flex: "1 1 auto",
      "& h4": {
        margin: "0",
        flexGrow: 2,
        color: "white",
        fontSize: "0.85rem"
        // flex: "0 1 0"
      },
      "& .grademoji": {
        flexGrow: 0,
        color: "white",
        fontSize: "1.5rem"
        // flex: "0 1 0"
      },
      "& .icon-refresh": {
        flexGrow: 0,
        color: "white",
        cursor: "pointer",
        fontSize: "1.5rem"
        // flex: "0 1 0"
      }
    }
  };
};

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
    this.timer = setInterval(this.updateScores, 1200);
    window.addEventListener("click", this.updateScores);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.updateScores);
    clearInterval(this.timer);
    this.timer = null;
  }

  updateScores = () => {
    const challenges = document.querySelectorAll(`.challenge-block`);
    const correctChallenges = document.querySelectorAll(`.challenge-block.challenge-correct`);
    console.log(
      `challenges.length`,
      challenges.length,
      `correctChallenges`,
      correctChallenges.length
    );
    this.setState({ score: correctChallenges.length, totalAvailable: challenges.length });
  };

  resetAll = () => {
    const challengeResetButtons = document.querySelectorAll(".challenge-reset-button");
    challengeResetButtons.forEach(b => {
      if (b) b.click();
    });
  };

  render() {
    const { classes, reset } = this.props;
    const { score = 0, totalAvailable = -1 } = this.state;
    const hasPerfectScore = score === totalAvailable;
    if (totalAvailable <= 0) return <div />;

    return (
      <AppBar position="fixed" color="primary" className={classes.container}>
        <Tada when={hasPerfectScore}>
          <div className={classes.flexBar}>
            {getScoreIcon(score, totalAvailable)}
            <Bounce spy={score} bottom>
              {hasPerfectScore ? (
                <a
                  href={shareOnTwitter(
                    `I Completed the #JavaScriptChallenge on DanLevy.net! \n#jsquiz #promises\n\nTest your skills here: ${
                      self.location.href
                    }`,
                    self.location.href
                  )}
                  target="_blank"
                >
                  <TwitterIcon />
                </a>
              ) : (
                <h4>
                  Your score is {`${score}`} / {totalAvailable}
                </h4>
              )}
            </Bounce>
            <RefreshIcon fontSize="inherit" className={"icon-refresh"} onClick={this.resetAll} />
          </div>
        </Tada>
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
