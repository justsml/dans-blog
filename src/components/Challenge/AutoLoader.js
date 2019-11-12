import React from "react";
import Challenge from "./";
import { delay } from "functional-promises";
import { isHtml, stripHtml, removeBySelector, extractTagContent } from "../../utils/shared.js";

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

const retryApp = (fn, { limit = 10, delayMsec = 100, rateAmplifyDelay = 1.0 }) => {
  try {
    if (rateAmplifyDelay < 0.5 || rateAmplifyDelay > 1000) rateAmplifyDelay = 1.0;

    if (limit > 0 && fn() === false) {
      console.trace("retryApp Triggered!!!", { limit });
      delayMsec = delayMsec * rateAmplifyDelay;
      return setTimeout(
        () => retryApp(fn, { limit: limit - 1, delayMsec }),
        delayMsec,
        rateAmplifyDelay
      );
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
    this.__mounted = true;
  }

  checkContentForMetadata = config => {
    const { description: content } = config;
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

    if (getTitles(challenges).join(",") === getTitles(nextState.challenges).join(",")) return false;

    return true;
  }

  loadChallenges = challengeConfigs => {
    this.setState({ challenges: challengeConfigs }, () => {
      this.forceUpdate();
    });
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
        title: c.title || this.getContent(c, ".title"),
        answer: this.getContent(c, ".answer"),
        description: this.getContent(c, ".description"),
        explanation: this.getContent(c, ".explanation"),
        hint: this.getContent(c, ".hint"),
        options: !c.querySelectorAll
          ? []
          : Array.from(c.querySelectorAll(".options > *")).map(li => li.textContent)
      };
      // Check for in-line overides before going any further
      const overrides = this.checkContentForMetadata(config);

      console.log(`Overrides:`, overrides);
      return Object.assign({}, config, overrides);
      // return <Challenge key={config.title} {...config} />
    });

    // console.log("config", JSON.stringify(challengeConfigs));
    return challengeConfigs;
  };

  render() {
    return (
      <div className="challenges-test">
        <h1>Mini Quiz: Check your knowledge!</h1>
        <span className="challenge-label">&nbsp; quiz &nbsp;</span>
        {this.state.challenges.map((config, i) => {
          return <Challenge key={config.title} number={i + 1} {...config} />;
        })}
      </div>
    );
  }
}
