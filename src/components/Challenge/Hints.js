import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import marked from "marked";
import { isHtml } from "../../utils/shared.js";

class Hints extends React.Component {
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.showIndex !== this.props.showIndex) return true
  //   if (nextState.activeStep !== this.state.activeStep) return true
  //   return false
  // }

  // handleNext = () => {
  //   this.setState(state => ({
  //     activeStep: state.activeStep + 1,
  //   }));
  // };

  // handleBack = () => {
  //   this.setState(state => ({
  //     activeStep: state.activeStep - 1,
  //   }));
  // };

  static propTypes = {
    hints: PropTypes.oneOf(PropTypes.string, PropTypes.arrayOf(PropTypes.string)),
    showIndex: PropTypes.number.isRequired,
    handlePrev: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  render() {
    const { hints, showIndex, handleNext, handlePrev, classes } = this.props;

    if (!hints || hints.length === 0) {
      console.info('Warning: No hints found!', JSON.stringify(this.props))
      return <div />
    }
    if (showIndex < 0) {
      return <div className='hints-available'>[Hints Available]</div>
    }
    return (
      <Card className={this.props.className + ' ' + classes.card}>
        {hints.length >= 2 && <MobileStepper
          variant="dots"
          steps={hints.length}
          position="static"
          activeStep={showIndex + 1}
          nextButton={
            <Button size="small" onClick={handleNext}>
              Next <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handlePrev}>
              <KeyboardArrowLeft /> Prev
            </Button>
          }
        />}
        <section className={"hint-content " + classes.content}>
          <Typography className={classes.title} color="textSecondary" variant="h6" gutterBottom>
            Hint <small>#{showIndex + 1}/{hints.length}</small>
          </Typography>
          <Typography variant="caption" className="hint">
            {this.renderContent(hints[showIndex])}
          </Typography>
        </section>
      </Card>
    );
  }
}

const styles = theme => ({
  title: {},
  content: {
    padding: '1rem'
  },
  card: {}
})

export default injectSheet(styles)(Hints);

