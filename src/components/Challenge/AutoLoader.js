import React from "react";
import Challenge from "./";
import { delay } from "functional-promises";
import { isHtml } from "../../utils/shared.js";

/*
EXAMPLE CHALLENGE DEFINITION:

<section class="challenge" group="Definitions" title="Question #1: Meaning of life:">
  <h2 class="description">What is the meaning of life?</h2>
  <legend class="hint"><i>Do great good; it will be revealed</i> - dan levy</hint>
  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="explanation">Overview & more resources</div>
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
  }

  checkContentForMetadata = content => {
    if (!content) return {};
    // TODO: Extract to pure fns file
    const stripHtml = html => html.replace(/<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/gim, "");
    const extractH1 = html => html.match(/<h1>[^<]*<\/h1>/im);
    const extractBlockquote = html => html.match(/<blockquote>[^<]*<\/blockquote>/im);

    const html = isHtml(content) ? html : this.renderMarkdown(content);
    const data = {
      title: stripHtml(extractH1(html)),
      hint: stripHtml(extractBlockquote(html))
    };
    if (data.title && data.title.length <= 2) data.title = undefined;
    if (data.hint && data.hint.length <= 2) data.hint = undefined;
    return data;
  };

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
        hint: this.getContent(c, ".hint"),
        options: !c.querySelectorAll
          ? []
          : Array.from(c.querySelectorAll(".options > *")).map(li => li.textContent)
      };
      // Check for in-line overides before going any further
      const overrides = this.checkContentForMetadata(config.description);

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
        {this.state.challenges.map(config => {
          return <Challenge key={config.title} {...config} />;
        })}
      </div>
    );
  }
}
