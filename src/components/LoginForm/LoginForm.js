import React, { Component } from "react";
import { connect } from "react-redux";
import { getIsAuthorized, authRequest } from "../../modules/Login";
import { Redirect } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";

import "./LoginForm.css";

const styles = theme => ({
  title: {
    color: "black",
    textAlign: "center",
    marginBottom: "16px"
  },
  paper: {
    width: "25%",
    maxWidth: "406px",
    padding: "24px",
    boxSizing: "border-box"
  },
  input: {
    width: "100%"
  }
});

const validate = (name, value) => {
  switch (name) {
    case "inputName":
      if (value !== "test@test.com") {
        return "Неверный логин";
      } else {
        return "";
      }
    case "password":
      if (value !== "123123") {
        return "Неверный пароль";
      } else {
        return "";
      }
    default:
      return "";
  }
};

class LoginForm extends Component {
  state = {
    inputName: {
      value: "",
      error: ""
    },
    password: {
      value: "",
      error: ""
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { inputName, password } = this.state;
    const result = {
      name: inputName.value,
      pass: password.value
    };
    this.props.authRequest(result);
  };

  handleChange = name => event => {
    const { value } = event.target;
    const error = validate(name, value);
    this.setState({
      [name]: { value, error }
    });
  };

  render() {
    const { paper, title, input, button } = this.props.classes;
    const { inputName, password } = this.state;

    return (
      <>
        {this.props.isAuthorized ? <Redirect to="/map" /> : null}
        <Paper className={paper}>
          <Typography className={title} variant="display1">
            Войти
          </Typography>
          <form onSubmit={this.handleSubmit} className="LoginForm">
            <div className="LoginForm__row">
              <TextField
                error={inputName.error.length > 0 && true}
                required
                className={input}
                id="loginName"
                label="Имя пользователя"
                value={inputName.value}
                onChange={this.handleChange("inputName")}
              />
              {inputName.error.length > 0 && (
                <p className="LoginForm__error">{inputName.error}</p>
              )}
            </div>
            <div className="LoginForm__row">
              <TextField
                error={password.error.length > 0 && true}
                required
                className={input}
                id="loginPassword"
                label="Пароль"
                value={password.value}
                onChange={this.handleChange("password")}
              />
              {password.error.length > 0 && (
                <p className="LoginForm__error">{password.error}</p>
              )}
            </div>
            <div className="LoginForm__row">
              <Button
                type="submit"
                className={button}
                variant="outlined"
                color="primary"
              >
                Войти
              </Button>
            </div>
          </form>
        </Paper>
      </>
    );
  }
}

const mapStateToProps = state => ({ isAuthorized: getIsAuthorized(state) });

const mapDispathToProps = { authRequest };

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withStyles(styles)(LoginForm));
