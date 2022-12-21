import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import marked from "marked";
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
import Pulse from "react-reveal/Pulse";
import HeadShake from "react-reveal/HeadShake";
import Fade from "react-reveal/Fade";
import "./style.css";
// import { trackCustomEvent } from "gatsby-plugin-google-analytics";
import { trackCustomEvent } from "../../utils/helpers.js";
import { isHtml } from "../../utils/shared.js";
import safeStorage from "../../utils/safeStorage.js";
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

const styles = theme => ({
  card: {},
  prompt: {
    marginLeft: "0",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start"
  },
  content: {
    paddingTop: "0px"
  },
  outerBox: {
    width: "100%",
    margin: "1em auto",
    border: "1px solid #999",
    padding: "0em 1rem 1rem 1rem",
    position: "relative",
    "& code[class*='language-'], pre[class*='language-']": {
      fontSize: "0.9rem"
    },
    "& .challenge-option svg": {
      marginBottom: "-0.4rem"
    },
    "& .question-header": {
      padding: "0 0.1em 0.1em 0.1em",
      position: "absolute",
      top: "1.7rem",
      left: "1.25rem"
    },
    "&.challenge-correct li.challenge-option-incorrect": {
      border: "1px solid transparent",
      "& *": {
        cursor: "default",
        color: "rgba(0, 0, 0, 0.4)"
      }
    },
    "&.challenge-correct li.challenge-option-correct": {
      transition: "transform 0.33s ease-in",
      border: "1px solid transparent",
      transform: "scale(1.1, 1.1)",
      color: "rgba(0, 0, 0, 0.9)"
    },
    "&.challenge-correct li": {
      transition: "transform 0.33s ease-in",
      "& *": {
        cursor: "default"
      }
    },
    [`@media (max-width: ${theme.mediaQueryTresholds.M}px)`]: {
      padding: "0em 0rem 0rem 1rem",
      width: "100%",
      "& code[class*='language-'], pre[class*='language-']": {
        fontSize: "0.8rem",
        wordSpacing: "-0.125rem"
      },
      "& .gatsby-highlight": {
        margin: "0 -2.1rem"
      }
    },
    [`@media (max-width: ${theme.mediaQueryTresholds.L}px)`]: {
      width: "100%",
      "& code[class*='language-'], pre[class*='language-']": {
        fontSize: "0.9rem"
      },
      "& .gatsby-highlight": {
        margin: "0 -2.1rem"
      }
    }
    // [`@media (max-width: ${theme.mediaQueryTresholds.L}px)`]: {
    //   width: "95%"
    // }
  },
  icon: {
    margin: "0 1rem 0 0"
  },
  failed: {
    border: "1px dashed red"
  },
  correct: {
    border: "1px solid green"
  },
  description: {
    "& h1": {
      // display: "none",
      marginLeft: "1.25rem"
    }
  },
  optionList: {
    // cursor: 'pointer',
    listStyle: "none",
    margin: "0 0 0 0rem",
    paddingLeft: "0rem",
    width: "100%",
    "& li": {
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      cursor: "pointer",
      margin: "1.2rem 0em 0 -1.5rem",
      padding: "0.5rem 0",
      border: "1px solid transparent",
      "> span": {
        width: "35px"
      },
      "& *": {
        cursor: "pointer"
      },
      "&:hover": {
        border: "1px solid #999"
      },
      [`@media (max-width: ${theme.mediaQueryTresholds.M}px)`]: {
        justifyContent: "left",
        margin: "1.2rem -2.6rem 0 0",
        width: "100%",
        overflowX: "auto"
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        margin: "1.2rem -2.6rem 0 0",
        padding: "0.5rem 0",
        overflowX: "auto"
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
  actions: {
    // width: "100%",
    // height: "2.125rem",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between"
  },
  status: {
    flexGrow: 2,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  centered: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  // optionItemCompleted: {
  //   display: "flex",
  //   margin: "1.2em 0.25em",
  //   padding: "0.5em",
  //   border: "1px solid transparent",
  //   "> span": {
  //     width: "35px"
  //   }
  // },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: "all 0.25s ease-in"
  }
});

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

  trackAnswer = () => {
    trackCustomEvent({
      // string - required - The object that was interacted with (e.g.video)
      category: `Quiz: ${window.location.host}/${window.location.pathname.replace(/^\/|\/$/g, "")}`,
      // string - required - Type of interaction (e.g. 'play')
      action: this.isCorrect() ? "Correct" : "Incorrect",
      // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
      label: this.props.title + " #" + this.props.number,
      // number - optional - Numeric value associated with the event. (e.g. A product ID)
      value: this.state.attempts
    });
  };

  saveState = () => {
    const { attempts, selection } = this.state;
    const data = JSON.stringify({ attempts, selection });
    // console.log("saving cachedState", data);
    safeStorage.setItem("Challenge_" + this.props.title + this.props.number, data);
  };

  loadState = () => {
    let cachedState = safeStorage.getItem("Challenge_" + this.props.title + this.props.number);
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
    setTimeout(this.trackAnswer, 90);
  };

  getOption = option => {
    const { classes } = this.props;
    const isCurrentAnswer = this.props.answer === option;
    const isCurrentSelection = this.state.selection === option;
    const selectionIcon =
      isCurrentSelection && isCurrentAnswer ? (
        <CheckBoxIcon className={classes.icon} fontSize="large" color="primary" />
      ) : (
        <CheckBoxOutlineBlankIcon className={classes.icon} fontSize="large" />
      );
    return (
      <li
        key={option}
        onClick={() => this.tryAnswer(option)}
        className={
          "challenge-option " +
          (this.isCorrect() && isCurrentAnswer
            ? "challenge-option-correct"
            : "challenge-option-incorrect")
        }
      >
        <Pulse duration={500} count={2} spy={this.isCorrect() && isCurrentAnswer}>
          {selectionIcon}
        </Pulse>
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
    const { showExplanation, attempts } = this.state;
    const { title, number, description, options, explanation } = this.props;
    const { classes } = this.props;

    let challengeClasses =
      classes.outerBox +
      " challenge-block " +
      (this.isCorrect()
        ? `challenge-correct ${classes.correct}`
        : `challenge-incorrect ${attempts}` >= 1
          ? classes.failed
          : "");
    // this.isCorrect()

    const showHelp = showExplanation;

    const headerIcon =
      attempts === 0 ? (
        <HelpIcon color="action" fontSize="large" title={`Question: ${title}`} />
      ) : this.isCorrect() ? (
        <CheckCircle color="primary" fontSize="large" />
      ) : (
        <CancelIcon color="error" fontSize="large" />
      );

    return (
      <HeadShake
        spy={attempts}
        when={attempts !== this.state.cachedState.attempts && !this.isCorrect()}
      >
        <Card className={`challenge-ui ${challengeClasses}`}>
          <CardHeader className="question-header" avatar={headerIcon}>
            <Typography>
              {Number(number) > 0 ? number + ". " : ""}
              {title}
            </Typography>
          </CardHeader>
          <CardContent className={`${classes.content}`}>
            <Typography className={`q-description ${classes.description}`} variant="body2">
              {this.renderContent(this.props.html || description, { className: "description" })}
            </Typography>
            <Typography className="q-answers-list" variant="body2">
              <div className={classes.prompt}>
                <HelpOutlineIcon fontSize="large" className={classes.icon} />
                Please select the closest answer:
              </div>
              <Fade top cascade duration={500} fraction={0.25}>
                <ul className={classes.optionList}>{options.map(this.getOption)}</ul>
              </Fade>
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            {attempts > 0 && (
              <Button
                role="button"
                variant="outlined"
                color="secondary"
                size="small"
                onClick={this.reset}
                className={"challenge-reset-button"}
              >
                Reset
                <RefreshIcon />
              </Button>
            )}
            {!this.isCorrect() &&
              attempts > 0 && (
                <div className={classes.status}>
                  <CancelIcon color="secondary" fontSize="large" /> Try Again
                </div>
              )}
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
