import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

import { routeClear } from "../../modules/Routes";

import "./RepeatBlock.css";

const styles = theme => ({
  title: {
    color: "black",
    marginBottom: "16px"
  },
  button: {
    marginTop: "16px"
  },
  paper: {
    width: "100%",
    padding: "24px",
    zIndex: "100"
  }
});

class RepeatBlock extends Component {
  handleClick = () => {
    this.props.routeClear();
  };
  render() {
    const { paper, title, button } = this.props.classes;
    const { titleText, descr, linkText } = this.props;
    return (
      <div className="RepeatBlock">
        <Paper className={paper}>
          <Typography className={title} variant="display1">
            {titleText}
          </Typography>
          <Typography variant="body1">{descr}</Typography>
          <Button
            className={button}
            variant="outlined"
            color="primary"
            onClick={this.handleClick}
          >
            {linkText}
          </Button>
        </Paper>
      </div>
    );
  }
}

const mapDispathToProps = {
  routeClear
};

export default connect(
  null,
  mapDispathToProps
)(withStyles(styles)(RepeatBlock));
