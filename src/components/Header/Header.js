import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getIsAuthorized, authOff } from "../../modules/Login";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core";

const styles = theme => ({
  appBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "64px",
    backgroundColor: "#fff",
    paddingLeft: "24px",
    paddingRight: "24px"
  },
  noDecor: {
    textDecoration: "none"
  }
});

class Header extends Component {
  handleLogoff = () => {
    this.props.authOff();
  };
  renderLogBtn = () => {
    const { isAuthorized } = this.props;
    const { noDecor } = this.props.classes;
    if (isAuthorized) {
      return <Button onClick={this.handleLogoff}>Выйти</Button>;
    } else {
      return (
        <Link className={noDecor} to="/login">
          <Button>Войти</Button>
        </Link>
      );
    }
  };

  render() {
    const { appBar, noDecor } = this.props.classes;
    return (
      <AppBar className={appBar} color="primary" position="static">
        <Typography variant="title">Loft Taxi</Typography>
        <div>
          <Link className={noDecor} to="/map">
            <Button>Карта</Button>
          </Link>

          <Link className={noDecor} to="/profile">
            <Button>Профиль</Button>
          </Link>
          {this.renderLogBtn()}
        </div>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({ isAuthorized: getIsAuthorized(state) });

const mapDispathToProps = { authOff };

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withStyles(styles)(Header));
