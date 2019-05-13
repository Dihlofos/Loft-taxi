import React, { Component } from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

import "./WarningBlock.css";

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
  },
  noDecor: {
    textDecoration: "none"
  }
});

class WarningBlock extends Component {
  render() {
    const { paper, title, noDecor, button } = this.props.classes;
    const { titleText, descr, linkText, link, mod } = this.props;
    return (
      <div className={`WarningBlock ${mod}`}>
        <Paper className={paper}>
          <Typography className={title} variant="display1">
            {titleText}
          </Typography>
          <Typography variant="body1">{descr}</Typography>
          <Link className={noDecor} to={link}>
            <Button className={button} variant="outlined" color="primary">
              {linkText}
            </Button>
          </Link>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(WarningBlock);
