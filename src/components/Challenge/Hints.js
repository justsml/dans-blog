import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from "react-jss";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

class Hints extends React.Component {
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
    hints: PropTypes.oneOf(PropTypes.string, PropTypes.arrayOf(PropTypes.string)).isRequired,
    showIndex: PropTypes.number.isRequired,
    handleBack: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  render() {
    const { hints, showIndex, handleNext, handleBack } = this.props;

    if (!hints || hints.length === 0) return null

    return (
      <Card className={this.props.className}>
        <MobileStepper
          variant="dots"
          steps={hints.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={this.state.showIndex === hints.length - 1}>
              Next <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={this.state.showIndex === 0}>
              <KeyboardArrowLeft /> Back
            </Button>
          }
        />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Hint #{showIndex + 1}/{hints.length}
        </Typography>
        <Typography component="p" className="hint">
          {hints[showIndex]}
        </Typography>
      </Card>
    );
  }
}

export default Hints;

