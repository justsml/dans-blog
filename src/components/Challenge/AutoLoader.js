import React from "react";
import Challenge from "./";

/*
EXAMPLE CHALLENGE DEFINITION:

<div class="challenge" title="Question #1: Meaning of life:">
  <div class="description">What is the meaning of life?</div>
  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="explanation">Overview & more resources</div>
</div>
*/

const retryApp = (fn, { limit = 10, delayMsec = 100 }) => {
  try {
    if (limit > 0 && fn() === false) {
      console.trace("retryApp Triggered!!!", { limit });
      return setTimeout(() => retryApp(fn, { limit: limit - 1, delayMsec }), delayMsec);
    }
  } catch (e) {
    console.warn(`retryFail #${limit} remain: `, e);
  }
};

export default class AutoLoader extends React.Component {
  state = { loaded: false, challenges: [] };

  getContent = (elem, selector) => {
    const el = elem && elem.querySelector && elem.querySelector(selector);
    return el ? el.innerHTML : "";
  };

  componentDidMount() {
    // check the DOM for static data to extract
    retryApp(this.checkInlineChallenges, { limit: 8, delayMsec: 125 });
  }

  checkInlineChallenges = () => {
    if (!document.querySelector(".challenge")) return false;
    this.loadTimeout = setTimeout(() => this.loadChallenges(this.getChallenges()), 750);
  };
  componentWillUnmount() {
    clearTimeout(this.loadTimeout);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const challenges = this.getChallenges();
    const getTitles = cs => cs.map(c => c.title);

    if (getTitles(challenges).join(",") === getTitles(nextState.challenges).join(",")) return false;

    return true;
  }

  loadChallenges = challengeConfigs => {
    this.setState({ challenges: challengeConfigs }, () => {
      this.forceUpdate();
    });
  };

  getChallenges = () => {
    const challenges = Array.from(document.querySelectorAll(".challenge"));
    if (challenges.length <= 0) return [];

    // console.log("challenges", challenges);

    const challengeConfigs = challenges.map(c => {
      const config = {
        title: c.title || this.getContent(c, ".title"),
        answer: this.getContent(c, ".answer"),
        description: this.getContent(c, ".description"),
        explanation: this.getContent(c, ".explanation"),
        options: !c.querySelectorAll
          ? []
          : Array.from(c.querySelectorAll(".options > *")).map(li => li.textContent)
      };
      return config;
      // return <Challenge key={config.title} {...config} />
    });

    // console.log("config", JSON.stringify(challengeConfigs));
    return challengeConfigs;
  };

  render() {
    return (
      <div className="challenges-test">
        {this.state.challenges.map(config => {
          return <Challenge key={config.title} {...config} />;
        })}
      </div>
    );
  }
}
