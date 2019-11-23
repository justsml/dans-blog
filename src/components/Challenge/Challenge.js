import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import marked from "marked";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckCircle from "@material-ui/icons/CheckCircle";
import HelpIcon from "@material-ui/icons/Help";
import RefreshIcon from "@material-ui/icons/RefreshOutlined";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Typography from "@material-ui/core/Typography";
import LightSpeed from "react-reveal/LightSpeed";
import HeadShake from "react-reveal/HeadShake";
import Fade from "react-reveal/Fade";
import "./style.css";

import { isHtml } from "../../utils/shared.js";
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
  card: {},
  prompt: {
    marginLeft: "14px"
  },
  outerBox: {
    width: "95%",
    margin: "1em auto",
    border: "1px solid #999",
    padding: "0em 1rem 1rem 1rem"
  },
  failed: {
    border: "1px dashed red"
  },
  correct: {
    border: "1px solid green"
  },
  description: {
    h1: {
      display: "none"
    }
  },
  optionList: {
    // cursor: 'pointer',
    listStyle: "none",
    margin: "0",
    paddingLeft: "1em",
    width: "100%",
    "& li": {
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      cursor: "pointer",
      margin: "1.2em 0.25em",
      padding: "0.5em",
      border: "1px solid transparent",
      "> span": {
        width: "35px"
      },
      "> *, label": {
        cursor: "pointer"
      },
      "&:hover": {
        border: "1px solid #333"
      }
    }
  },
  // optionItem: {
  //   transition: "all 0.33s ease-in",
  //   cursor: "pointer",
  //   margin: "1.2em 0.25em",
  //   padding: "0.5em",
  //   border: "1px solid transparent",
  //   "> *": {
  //     cursor: "pointer"
  //   },
  //   "&:hover": {
  //     border: "1px solid #333"
  //   }
  // },
  statusBox: {
    width: "100%",
    height: "2.125rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between"
  },
  centered: {
    display: "flex",
    alignItems: "center",
    alignContent: "center"
  },
  optionItemCompleted: {
    display: "flex",
    zoom: "150%",
    margin: "1.2em 0.25em",
    padding: "0.5em",
    border: "1px solid transparent",
    "> span": {
      width: "35px"
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: "all 0.25s ease-in"
  }
};

class Challenge extends React.Component {
  state = {
    selection: "",
    attempts: 0,
    showExplanation: false,
    cachedState: {}
  };

  static propTypes = {
    onAnswer: PropTypes.func,
    reset: PropTypes.func,
    number: PropTypes.number,
    title: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    explanation: PropTypes.string,
    html: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.loadState();
  }

  saveState = () => {
    const { attempts, selection } = this.state;
    const data = JSON.stringify({ attempts, selection });
    // console.log("saving cachedState", data);
    localStorage.setItem("Challenge_" + this.props.title + this.props.number, data);
  };

  loadState = () => {
    let cachedState = localStorage.getItem("Challenge_" + this.props.title + this.props.number);
    // console.log("loading cachedState", this.props.title, cachedState);
    cachedState = cachedState
      ? JSON.parse(cachedState)
      : {
          attempts: 0,
          selection: ""
        };
    this.setState({ ...this.state, cachedState, ...cachedState });
  };

  isCorrect = answer => {
    if (answer === this.props.answer) return true;
    return this.state.selection === this.props.answer;
  };

  tryAnswer = option => {
    const isCorrect = this.isCorrect();
    if (typeof this.props.onAnswer !== "function") {
      console.warn("[danlevy.net - quiz ui] Challenge onAnswer callback is required", option);
    } else {
      this.props.onAnswer({ correct: isCorrect, value: option, questionTitle: this.props.title });
    }
    if (isCorrect) return null;
    this.setState((state, props) => ({ ...state, selection: option, attempts: ++state.attempts }));
    setTimeout(this.saveState, 1);
  };

  getOption = option => {
    const { classes } = this.props;
    const selectionIcon =
      this.state.selection === option && option === this.props.answer ? (
        <CheckBoxIcon fontSize="large" />
      ) : (
        <CheckBoxOutlineBlankIcon fontSize="large" />
      );

    return (
      <li
        key={option}
        onClick={() => this.tryAnswer(option)}
        className={this.isCorrect() ? "challenge-answer" : classes.optionItem}
      >
        {selectionIcon}
        <label>{option}</label>
      </li>
    );
  };

  reset = () => {
    this.setState({ ...this.state, attempts: 0, selection: "", showExplanation: false }, () =>
      setTimeout(this.saveState, 1)
    );
    if (this.props.reset) this.props.reset();
  };

  handleExpandClick = () => {
    this.setState({ ...this.state, showExplanation: !this.state.showExplanation });
  };

  getMarkdownHtml = markdown => {
    return marked(markdown, {
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
  };

  renderHtml = (content, props = {}) => (
    <div dangerouslySetInnerHTML={{ __html: content }} {...props} />
  );

  renderMarkdown = (content, props = {}) => this.renderHtml(this.getMarkdownHtml(content), props);

  renderContent = (content, props = {}) => {
    // might need to default assume markdown
    return isHtml(content) ? this.renderHtml(content, props) : this.renderMarkdown(content, props);
  };

  render() {
    const { showExplanation } = this.state;
    const { title, number, description, options, explanation } = this.props;
    const { classes } = this.props;

    let challengeClasses =
      classes.outerBox +
      " challenge-block " +
      (this.isCorrect()
        ? `challenge-correct ${classes.correct}`
        : `challenge-not-correct ${this.state.attempts}` >= 1
          ? classes.failed
          : "");
    // this.isCorrect()

    const showHelp = showExplanation;

    const headerIcon =
      this.state.attempts === 0 ? (
        <HelpIcon color="default" fontSize="large" title={`Quiz/Question ${title}`} />
      ) : this.isCorrect() ? (
        <CheckCircle color="primary" fontSize="large" />
      ) : (
        <CancelIcon color="error" fontSize="large" />
      );

    return (
      <HeadShake
        spy={this.state.attempts}
        when={this.state.attempts !== this.state.cachedState.attempts}
      >
        <Card className={`challenge-ui ${challengeClasses}`}>
          <CardHeader
            className="question-header"
            avatar={headerIcon}
            title={
              <h2>
                {Number(number) > 0 ? number + ". " : ""}
                {title}
              </h2>
            }
          >
            {title}
          </CardHeader>
          <CardContent>
            <Typography className={`q-description ${classes.description}`} component="span">
              {this.renderContent(this.props.html || description, { className: "description" })}
            </Typography>
            <Typography className="q-answers-list" component="span">
              <blockquote className={classes.centered + " " + classes.prompt}>
                <HelpOutlineIcon fontSize="large" />
                Please select the most appropriate answer:
              </blockquote>
              <Fade top cascade fraction="0.5">
                <ul className={classes.optionList}>{options.map(this.getOption)}</ul>
              </Fade>
            </Typography>
            <Typography component="q-results-bar">
              {this.state.attempts > 0 && (
                <div className={classes.statusBox}>
                  <small>{`Attempts: ${this.state.attempts}`}</small>
                  {this.isCorrect() ? (
                    <div className={classes.centered}>
                      <CheckBoxIcon color="primary" fontSize="large" />
                      {` Correct: ${this.state.selection}`}
                    </div>
                  ) : (
                    <div className={classes.centered}>
                      <CancelIcon color="error" /> Try Again
                    </div>
                  )}
                  <Button
                    role="button"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={this.reset}
                  >
                    Reset
                    <RefreshIcon />
                  </Button>
                </div>
              )}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classnames(classes.expand, {
                [classes.expandOpen]: showHelp
              })}
              onClick={this.handleExpandClick}
              aria-expanded={showHelp}
              aria-label="Show Hint"
              title="Show Hint"
            >
              {!explanation || explanation.length < 30
                ? "[todo]"
                : this.state.showExplanation
                  ? `Hide Hint`
                  : `Show Hint`}
              <HelpIcon />
            </Button>
          </CardActions>
          <Collapse in={showHelp} unmountOnExit>
            <CardContent>
              {this.renderContent(explanation, { className: "explanation" })}
            </CardContent>
          </Collapse>
        </Card>
      </HeadShake>
    );

    // return (
    //   <section className={challengeClasses}>
    //     <h1>{this.props.title}</h1>

    //     {showHelp &&
    //       }
    //   </section>
    // );
  }
}

export default injectSheet(styles)(Challenge);
