import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import marked from "marked";

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

const styles = {
  outerBox: {
    width: "95%",
    margin: "1em auto",
    border: "1px solid #999",
    padding: "0em 1em 1em 1em"
  },
  failed: {
    border: "1px dashed red"
  },
  correct: {
    border: "1px solid green"
  },
  description: {},
  optionList: {
    // cursor: 'pointer',
    listStyle: "none",
    margin: "0",
    paddingLeft: "1em",
    width: "100%"
  },
  optionItem: {
    transition: "all 0.33s ease-in",
    cursor: "pointer",
    margin: "1.2em 0.25em",
    padding: "0.5em",
    border: "1px solid transparent",
    "> *": {
      cursor: "pointer"
    },
    "&:hover": {
      border: "1px solid #333"
    }
  },
  statusBox: {
    width: "100%",
    height: "2.125rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optionItemCompleted: {
    zoom: "150%",
    margin: "1.2em 0.25em",
    padding: "0.5em",
    border: "1px solid transparent"
  }
};

const isHtml = text => text.split(/<[^>]+>/).length > 1;
// const isMarkdown = text => text.split(/^#/).length >= 1;

class Challenge extends React.Component {
  state = {
    selection: "",
    attempts: 0,
    showExplanation: false
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    explanation: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.loadState();
  }

  saveState = () => {
    const { attempts, selection } = this.state;
    const data = JSON.stringify({ attempts, selection });
    // console.log("saving cachedState", data);
    localStorage.setItem("Challenge_" + this.props.title, data);
  };

  loadState = () => {
    let cachedState = localStorage.getItem("Challenge_" + this.props.title);
    // console.log("loading cachedState", this.props.title, cachedState);
    cachedState = cachedState
      ? JSON.parse(cachedState)
      : {
          attempts: 0,
          selection: ""
        };
    this.setState(cachedState);
  };

  isCorrect = answer => {
    if (answer === this.props.answer) return true;
    return this.state.selection === this.props.answer;
  };

  tryAnswer = option => {
    if (this.isCorrect()) return null;
    this.setState((state, props) => ({ selection: option, attempts: ++state.attempts }));
    setTimeout(this.saveState, 1);
  };

  getOption = option => {
    const { classes } = this.props;
    const selectionIcon =
      this.state.selection === option && option === this.props.answer ? "✅ " : "⬜ ";

    return (
      <li
        key={option}
        onClick={() => this.tryAnswer(option)}
        className={this.isCorrect() ? classes.optionItemCompleted : classes.optionItem}
      >
        <span>{selectionIcon}</span>
        <label>{option}</label>
      </li>
    );
  };

  reset = () => {
    this.setState({ attempts: 0, selection: "", showExplanation: false }, () =>
      setTimeout(this.saveState, 1)
    );
  };

  getMarkdownHtml = markdown => {
    return {
      __html: marked(markdown, {
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      })
    };
  };

  renderHtml = (content, props = {}) => (
    <div dangerouslySetInnerHTML={{ __html: content }} {...props} />
  );

  renderMarkdown = (content, props = {}) => (
    <div dangerouslySetInnerHTML={this.getMarkdownHtml(content)} {...props} />
  );

  detectAndRenderContent = (content, props = {}) => {
    return isHtml(content) ? this.renderHtml(content, props) : this.renderMarkdown(content, props);
  };

  render() {
    const { classes } = this.props;
    let challengeClasses =
      classes.outerBox +
      " challenge-block " +
      (this.isCorrect() ? classes.correct : this.state.attempts >= 1 ? classes.failed : "");
    // this.isCorrect()

    const showHelp = this.isCorrect() || this.state.showExplanation;
    return (
      <section className={challengeClasses}>
        <h1>{this.props.title}</h1>
        {this.detectAndRenderContent(this.props.description, { className: "description" })}
        <blockquote>Please select from the following options:</blockquote>
        <ul className={classes.optionList}>{this.props.options.map(this.getOption)}</ul>
        {this.state.attempts > 0 && (
          <div className={classes.statusBox}>
            <small>{`Attempts: ${this.state.attempts}`}</small>
            {this.isCorrect() ? ` ✅ Correct: ${this.state.selection}` : " ❌ Try Again "}
            <button role="button" onClick={this.reset}>
              Reset
            </button>
          </div>
        )}
        {showHelp &&
          this.detectAndRenderContent(this.props.explanation, { className: "explanation" })}
      </section>
    );
  }
}

export default injectSheet(styles)(Challenge);
