/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Challenge from "./";
// import { delay } from "functional-promises";
import { isHtml, stripHtml, removeBySelector, extractTagContent } from "../../utils/shared.js";
import Score from "./Score";
import { retryApp } from "../../utils/helpers.js";
// import ScrollAnimation from "react-animate-on-scroll";
/*
EXAMPLE CHALLENGE DEFINITION:

<section className="challenge" group="Definitions" title="Question #1: Meaning of life:">
  <h2 className="description">What is the meaning of life?</h2>
  <legend className="hint"><i>Do great good; it will be revealed</i> - dan levy</hint>
  <ul className="options">
    <li>1</li>
    <li>2</li>
    <li className="answer">42</li>
    <li>3</li>
  </ul>
  <div className="explanation">Overview & more resources</div>
</section>
*/

const styles = theme => ({
  autoloader: {
    [`@media (max-width: ${theme.mediaQueryTresholds.M}px)`]: {
      width: "99vw",
      margin: "0 -1.4rem",
      "& .gatsby-highlight": {
        margin: "0 -2.1rem"
      }
    }
  }
});

const getOneBySelector = (elem, selector) => {
  const el = elem && elem.querySelector && elem.querySelector(selector);
  return el ? el.innerHTML : "";
}

const getAllBySelector = (c, selector) => !c.querySelectorAll
  ? []
  : Array.from(c.querySelectorAll(selector))

class AutoLoader extends React.Component {
  state = {
    score: { totalAvailable: -1, current: 0 },
    loaded: false,
    challenges: []
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    // check the DOM for static data to extract
    retryApp(this.checkInlineChallenges, { limit: 8, delayMsec: 125 });
    this.__mounted = true;
  }

  checkContentForMetadata = config => {
    const { description: content, hints } = config;
    if (!content) return {};

    const html = isHtml(content) ? content : this.renderMarkdown(content);
    config.html = html;
    const data = {
      title: stripHtml(extractTagContent("h1", html)),
      subtitle: stripHtml(extractTagContent("h2", html)),
      hint: stripHtml(extractTagContent("blockquote", html))
    };
    if (data.hint && data.hint.length >= 2) {
      config.hint = data.hint.trim();
    }

    if (data.title && data.title.length >= 2) {
      config.title = String(data.title).trim();
      // console.log(`MetaCheck.pre.removeBySelector`, config.html.length, config.html);
      config.html = removeBySelector("h1", config.html);
      // console.log(`MetaCheck.post.removeBySelector`, config.html.length, config.html);
    }

    return config;
  };

  checkInlineChallenges = () => {
    if (!document.querySelector(".challenge")) return false;
    this.loadTimeout = setTimeout(() => this.loadChallenges(this.getChallenges()), 750);
  };

  componentWillUnmount() {
    this.__mounted = false;
    clearTimeout(this.loadTimeout);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const challenges = this.getChallenges();
    const getTitles = cs => cs.map(c => c.title);

    this.resetLoadingSpinner();

    if (getTitles(challenges).join(",") === getTitles(nextState.challenges).join(",")) return false;

    return true;
  }

  resetLoadingSpinner = () => {
    const challengeUiCards = document.querySelectorAll(".challenge-ui");
    if (!challengeUiCards) return;
    const quizReadyUi = document.querySelector(".quiz-ready");
    const quizLoadingUi = document.querySelector(".quiz-loading");
    if (quizReadyUi && quizLoadingUi) {
      quizReadyUi.style.display = "block";
      quizLoadingUi.style.display = "none";
    }
  };

  loadChallenges = challengeConfigs => {
    this.setState(
      {
        challenges: challengeConfigs,
        score: { ...this.state.score, totalAvailable: challengeConfigs.length }
      },
      () => {
        this.forceUpdate();
        this.resetLoadingSpinner();
      }
    );
  };

  getChallenges = () => {
    if (!this.__mounted) {
      console.warn("Short circuit Statful Work when UNMOUNTED!");
      return [];
    }
    const challenges = Array.from(document.querySelectorAll(".challenge"));
    if (challenges.length <= 0) return [];

    // console.log("challenges", challenges);

    const challengeConfigs = challenges.map(c => {
      const config = {
        title: c.title || getOneBySelector(c, ".title"),
        answer: getOneBySelector(c, ".answer"),
        description: getOneBySelector(c, ".description"),
        explanation: getOneBySelector(c, ".explanation").trim(),
        hint: getAllBySelector(c, ".hint"),
        options: getAllBySelector(c, ".options > *").map(li => li.textContent),
        hints: getAllBySelector(c, ".hint").map(li => li.textContent)
      };
      // Check for in-line overides before going any further
      const overrides = this.checkContentForMetadata(config);

      // console.log(`Overrides:`, overrides);
      return Object.assign({}, config, overrides);
      // return <Challenge key={config.title} {...config} />
    });

    // console.log("config", JSON.stringify(challengeConfigs));
    return challengeConfigs;
  };

  onAnswer = ({ correct, value }) => {
    let current = this.state.score.current;
    if (correct) {
      current++;
    }
    this.setState({
      ...this.state,
      score: { totalAvailable: this.state.challenges.length, current }
    });
  };

  resetScores = () => {
    this.setState({
      ...this.state,
      score: { totalAvailable: this.state.challenges.length, current: 0 }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={"challenges-autoloader " + classes.autoloader}>
        {this.state.challenges.map((config, i) => {
          return (
            <Challenge
              key={`${i + 1}-${config.title}`}
              number={i + 1}
              {...config}
              onAnswer={this.onAnswer}
              reset={this.resetScores}
            />
          );
        })}
        {this.state.challenges.length > 0 && (
          <Score
            reset={this.resetScores}
            totalAvailable={this.state.score.totalAvailable}
            score={this.state.score.current}
          />
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(AutoLoader);
