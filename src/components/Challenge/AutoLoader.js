import React from "react";
import Challenge from "./";

export default class AutoLoader extends React.Component {
  state = { loaded: false, challenges: [] };

  getContent = (elem, selector) => {
    const el = elem && elem.querySelector && elem.querySelector(selector);
    return el ? el.textContent : "";
  };

  componentDidMount() {
    // check the DOM for static data to extract
    setTimeout(this.loadChallenges, 750);
  }

  loadChallenges = () => {
    const challenges = Array.from(document.querySelectorAll(".challenge"));
    console.log("challenges", challenges);

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
      console.log("config", JSON.stringify(config));
      return config;
      // return <Challenge key={config.title} {...config} />
    });

    this.setState({ challenges: challengeConfigs });
    return challengeConfigs;
  };

  render() {
    return (
      <div className="challenges-test">
        {/* <button onClick={this.loadChallenges}>Load Challenge</button> */}
        {this.state.challenges.map(config => {
          return <Challenge key={config.title} {...config} />;
        })}
      </div>
    );
  }
}
