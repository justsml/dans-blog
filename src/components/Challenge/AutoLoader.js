import React from "react";
import Challenge from "./";

export default class AutoLoader extends React.Component {
  state = { challenges: [] };

  getContent = (elem, selector) => {
    const el = elem.querySelector(selector);
    return el ? el.textContent : "";
  };

  componentDidMount() {
    // check the DOM for static data to extract
    const challenges = [...document.querySelectorAll(".challenge")].map(c => {
      const config = {
        title: c.title || this.getContent(c, ".title"),
        answer: this.getContent(c, ".answer"),
        description: this.getContent(c, ".description"),
        explanation: this.getContent(c, ".explanation"),
        options: [...c.querySelectorAll(".options > *")].map(li => li.textContent)
      };
      console.log("config", JSON.stringify(config));
      return config;
      // return <Challenge key={config.title} {...config} />
    });

    this.setState({ challenges });
  }

  render() {
    return this.state.challenges.map(config => {
      return <Challenge key={config.title} {...config} />;
    });
  }
}
