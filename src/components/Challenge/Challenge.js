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
import MoreInfo from "./MoreInfo.js";
import Hints from "./Hints.js";
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

class Challenge extends React.Component {
  state = {
    selection: "",
    attempts: 0,
    showExplanation: false,
    showHintIndex: -1,
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
    hints: PropTypes.arrayOf(PropTypes.string),
    classes: PropTypes.object.isRequired,
    html: PropTypes.string
  };

  componentDidMount() {
    // this.loadState();
  }

  trackEvent = (action = this.isCorrect() ? "Correct" : "Incorrect", defer = 25) => {
    setTimeout(() => trackCustomEvent({
      // string - required - The object that was interacted with (e.g.video)
      category: `Quiz: ${window.location.host}/${window.location.pathname.replace(/^\/|\/$/g, "")}`,
      // string - required - Type of interaction (e.g. 'play')
      action,
      // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
      label: this.props.title + " #" + this.props.number,
      // number - optional - Numeric value associated with the event. (e.g. A product ID)
      value: this.state.attempts
    }), defer);
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
          selection: null
        };
    this.setState({ ...this.state, cachedState, ...cachedState });
  };

  isCorrect = (selection = this.state.selection) => {
    return selection === this.props.answer;
  };

  tryAnswer = option => {
    const wasCorrect = this.props.answer === this.state.selection;
    const isCorrect = this.props.answer === option;
    if (wasCorrect) return null
    if (typeof this.props.onAnswer !== "function") {
      console.warn("[danlevy.net - quiz ui] Challenge onAnswer callback is required", option);
    } else {
      this.props.onAnswer({ correct: isCorrect, selection: option, attempts: this.state.attempts, questionTitle: this.props.title });
    }
    this.toggleExplanation(true);
    if (!isCorrect) this.showNextHint();
    // if (isCorrect) return null;
    this.setState((state, props) => {
      setTimeout(this.saveState, 1);
      this.trackEvent();
      return { ...state, selection: option, attempts: ++state.attempts }
    });
  };

  getOption = option => {
    const { classes } = this.props;
    const { attempts = 0, selection } = this.state;
    const isCurrentlySelected = selection === option;
    let selectionIcon = <CheckBoxOutlineBlankIcon className={classes.icon} fontSize="large" />;

    if (isCurrentlySelected) {
      if (this.isCorrect()) {
        selectionIcon = <CheckBoxIcon className={classes.icon} fontSize="large" color="primary" />
      } else {
        selectionIcon = <CheckBoxOutlineBlankIcon className={classes.icon} fontSize="large" color="error" />
      }
    }

    return (
      <li
        key={option}
        onClick={() => this.tryAnswer(option)}
        className={
          "challenge-option " +
          (attempts > 0 && isCurrentlySelected ? "challenge-option-correct " : " ") +
          (attempts > 0 && !isCurrentlySelected ? "challenge-option-incorrect " : "")
        }
      >
        <Pulse duration={500} count={2} spy={isCurrentlySelected}>
          {selectionIcon}
        </Pulse>
        <label>{this.renderContent(option)}</label>
      </li>
    );
  };

  reset = () => {
    this.setState({ ...this.state, attempts: 0, selection: "", showExplanation: false, showHintIndex: -1 }, () => {
      this.trackEvent(`Reset`)
      setTimeout(this.saveState, 1)
    });
    if (this.props.reset) this.props.reset();
  };

  toggleExplanation = (showExplanation = !this.state.showExplanation) => {
    this.trackEvent(showExplanation ? `ShowExplanation` : `HideExplanation`)
    this.setState({ ...this.state, showExplanation: showExplanation });
  };

  showPrevHint = () => {
    const {showHintIndex = 0} = this.state
    const {hints} = this.props;
    if (!hints || hints.length <= 0) return
    let prevHint = showHintIndex - 1;

    if (prevHint < 0) {
      prevHint = hints.length - 1;
    }

    this.trackEvent(`Hint_${prevHint}`)
    this.setState({ ...this.state, showHintIndex: prevHint})
  };

  hideHints = () => {
    this.trackEvent(`HideHints`)
    // console.debug('hideHints', {showHintIndex: -1})
    this.setState({...this.state, showHintIndex: -1});
  }

  showNextHint = () => {
    // console.debug('showNextHint', {showHintIndex, nextHint})
    const {showHintIndex = 0} = this.state
    const {hints} = this.props;
    if (!hints || hints.length <= 0) return
    let nextHint = showHintIndex + 1

    if (nextHint >= hints.length) {
      nextHint = 0
    }
    this.trackEvent(`Hint_${nextHint}`)
    this.setState({ ...this.state, showHintIndex: nextHint})
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
    const { selection, showExplanation, showHintIndex, attempts } = this.state;
    const { answer, title, number, description, options, explanation, hints } = this.props;
    const { classes } = this.props;
    const isDirty = attempts && attempts >= 1
    const isCorrect = selection === answer

    let challengeClasses =
      classes.outerBox +
      " challenge-block " +
      (isDirty && isCorrect
        ? `challenge-correct ${classes.correct}` : ` `) +
      (isDirty && !isCorrect ? `challenge-incorrect attempt-count-${attempts} ${classes.failed}` : ``);
    // this.isCorrect()

    const showHelp = showExplanation || showHintIndex != null;

    const headerIcon =
      attempts === 0 ? (
        <HelpIcon color="action" fontSize="large" title={`Question: ${title}`} />
      ) : isCorrect ? (
        <CheckCircle color="primary" fontSize="large" />
      ) : (
        <CancelIcon color="error" fontSize="large" />
      );

    return (
      <HeadShake
        spy={attempts}
        when={attempts !== this.state.cachedState.attempts && !isCorrect}
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
              <Fade top cascade duration={500} fraction={0.25}>
                <ul className={classes.optionList}>{options.map(this.getOption)}</ul>
              </Fade>
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            {!isCorrect && <div className="wrong-answer">
              {isDirty && (
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
              ) || null}
              {!isCorrect && isDirty && (
                  <div className={classes.status}>
                    <CancelIcon color="secondary" fontSize="large" /> Incorrect! Try another option.
                  </div>
                ) || null}
            </div>}
            <div className="btn-group help-buttons" role="group" aria-label="Available hints or explanation">
              {hints.length > 0 && <Button
                variant={showHintIndex != -1 ? `outlined` : `contained`}
                size="small"
                color="primary"
                className={classnames(classes.expand, 'btn', {
                  [classes.expandOpen]: showHintIndex != -1
                })}
                onClick={() => showHintIndex === -1 ? this.showNextHint() : this.hideHints()}
                aria-expanded={showHintIndex != -1}
                aria-label={`Show ${hints.length} Hint${hints.length > 1 ? 's' : ''}`}
                title="Toggle Hint"
              >
                {showHintIndex == -1
                    ? `Show ${hints.length} Hint${hints.length > 1 ? 's' : ''}`
                    : `Hide Hint${hints.length > 1 ? 's' : ''}`}
                <HelpIcon style={{marginLeft: '0.5rem'}} />
              </Button>}
              {explanation && explanation.length > 0 && <Button
                variant={showExplanation ? `outlined` : `contained`}
                size="small"
                color="default"
                className={classnames(classes.expand, 'btn', {
                  [classes.expandOpen]: showExplanation
                })}
                onClick={() => this.toggleExplanation()}
                aria-expanded={showExplanation}
                aria-label={`Show Explanation`}
                title="Toggle Explanation"
              >
                {showExplanation
                    ? `Hide Explanation`
                    : `Show Explanation`}
                <HelpIcon style={{marginLeft: '0.5rem'}} />
              </Button>}
            </div>
          </CardActions>
          <Collapse in={showHelp} unmountOnExit>
            <CardContent>
              {showHintIndex != -1 && <Hints showIndex={showHintIndex} hints={hints} handleNext={this.showNextHint} handlePrev={this.showPrevHint} />}
              {showExplanation && <MoreInfo className="explanation">{explanation}</MoreInfo>}
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


const styles = theme => ({
  card: {},
  prompt: {
    marginBottom: "0.5rem",
    [`@media (max-width: ${theme.mediaQueryTresholds.M}px)`]: {
      marginLeft: "-.5rem"
    },
    [`@media (max-width: ${theme.mediaQueryTresholds.M}px)`]: {
      marginLeft: "-.5rem"
    },
    marginLeft: "-0.5rem",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start"
  },
  outerBox: {
    width: "100%",
    margin: "1.5rem auto",
    border: "1px solid #999",
    padding: "0em 1rem 1rem 1rem",
    "& code[class*='language-'], pre[class*='language-']": {
      fontSize: "0.9rem",
      margin: "2rem 0"

    },
    "& .challenge-option svg": {
      marginBottom: "-0.4rem"
    },
    "& .question-header": {
      padding: "0.1em"
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
    h1: {
      display: "none"
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
        marginLeft: '-2.6rem',
        marginRight: '-2.6rem',
        marginBottom: "0",
        marginTop: "0",
        // margin: "1.2rem -2.6rem 0 0",
        padding: "0.5rem 2.6rem",
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
    width: "100%",
    // height: "2.125rem",
    flexDirection: "row",
    display: "flex",
    alignItems: "flex-start",
    alignContent: "center",
    justifyContent: "space-between",
    //.btn-group > .btn-group:not(:last-child) > .btn,
    //.btn-group > .btn:not(:last-child):not(.dropdown-toggle),
    //.btn-group > .dropdown-toggle:not(:last-of-type)
    "& .btn-group:not(:last-child) > .btn, .btn-group > .btn:not(:last-child):not(.dropdown-toggle)": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    "& .btn-group > .btn:not(:first-child)": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    "& .help-buttons": {
      maxWidth: 365
    }
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

export default injectSheet(styles)(Challenge);
