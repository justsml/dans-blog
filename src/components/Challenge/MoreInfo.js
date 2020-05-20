import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
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
    children: PropTypes.node,
    className: PropTypes.string
  }

  render() {
    const { children, classes } = this.props;

    if (!children || children.length === 0) {
      console.info('Warning: No info found!', JSON.stringify(this.props))
      return <div />
    }
    return (
      <Card className={this.props.className || ''}>
        <Typography className={classes.title} color="textPrimary" variant="h6" gutterBottom>
          More Info
        </Typography>
        <section className={"hint-content " + classes.content}>
          <Typography variant="caption" className="hint">
            {this.renderContent(children)}
          </Typography>
        </section>
      </Card>
    );
  }
}

const styles = theme => ({
  title: {
    display: 'flex',
    padding: '8px',
    background: '#fafafa',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {
    padding: '1rem',
    overflow: 'auto',
    maxHeight: 270
  }
})

export default injectSheet(styles)(Hints);

