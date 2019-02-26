import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import CancelIcon from "@material-ui/icons/Cancel";
import HelpIcon from "@material-ui/icons/Help";
import CheckCircle from "@material-ui/icons/CheckCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  card: {
    maxWidth: 600
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  correct: {
    color: theme.base.colors.linkHover
  }
});

class QuestionCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, children } = this.props;
    const { title, description, explanation, isCorrect } = this.props;
    const headerIcon = isCorrect ? (
      <CheckCircle className={this.props.classes.correct} />
    ) : (
      <CancelIcon style={{ color: "red" }} />
    );

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={headerIcon}
          action={<HelpIcon />}
          title={title} subheader={""}>
          {title}
        </CardHeader>
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        /> */}
        <CardContent>
          <Typography component="p">{description}</Typography>
          <Typography component="p">{children}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          {this.props.attempts >= 1 && (
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show Hint"
              title="Show Hint"
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
        </CardActions>
        <Collapse in={this.state.expanded} unmountOnExit>
          <CardContent>{explanation}</CardContent>
        </Collapse>
      </Card>
    );
  }
}

QuestionCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  explanation: PropTypes.string,
  attempts: PropTypes.number,
  children: PropTypes.node
};

export default withStyles(styles)(QuestionCard);
