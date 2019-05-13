import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";

import {
  getProfileData,
  getWarning,
  profileSave,
  profileShowWarning,
  profileHideWarning
} from "../../modules/Profile";

import WarningBlock from "../WarningBlock";

import "./ProfileForm.css";

const styles = theme => ({
  title: {
    color: "black",
    textAlign: "center",
    marginBottom: "16px"
  },
  paper: {
    width: "83.333%",
    maxWidth: "821px",
    padding: "24px",
    boxSizing: "border-box"
  },
  input: {
    width: "100%"
  },
  subtitle: {
    width: "100%",
    marginLeft: "12px",
    marginBottom: "16px"
  },
  button: {
    backgroundColor: "#3f51b5"
  }
});

const validate = (name, value) => {
  const validateReq = (name, value) => {
    switch (name) {
      case "profileName":
        if (value.length === 0) {
          return "Это обязательное поле";
        } else {
          return false;
        }
      case "card":
        if (value.length === 0) {
          return "Это обязательное поле";
        } else {
          return false;
        }
      case "date":
        if (value.length === 0) {
          return "Это обязательное поле";
        } else {
          return false;
        }
      case "cvv":
        if (value.length === 0) {
          return "Это обязательное поле";
        } else {
          return false;
        }
      default:
        return false;
    }
  };
  const validateLength = (name, value) => {
    switch (name) {
      case "card":
        if (value.length !== 0 && value.length !== 8) {
          return "В номере карты 8 цифр";
        } else {
          return false;
        }
      case "cvv":
        if (value.length !== 0 && value.length !== 3) {
          return "CVV состоит из 3 цифр";
        } else {
          return false;
        }
      default:
        return false;
    }
  };
  const validateContent = (name, value) => {
    switch (name) {
      case "profileName":
        if (value.match(/^[A-Za-z]+$/) === null) {
          return "В имени могут быть только латинские буквы";
        } else {
          return false;
        }
      case "card":
        if (value.match(/^\d+$/) === null) {
          return "В номере карты могут быть только цифры";
        } else {
          return false;
        }
      case "cvv":
        if (value.match(/^\d+$/) === null) {
          return "В номере CVV могут быть только цифры";
        } else {
          return false;
        }
      default:
        return false;
    }
  };

  if (validateReq(name, value)) {
    return validateReq(name, value);
  }
  if (validateLength(name, value)) {
    return validateLength(name, value);
  }
  if (validateContent(name, value)) {
    return validateContent(name, value);
  }

  return "";
};

class ProfileForm extends Component {
  state = {
    formHasErrors: false,
    profileName: {
      value: "",
      error: ""
    },
    card: {
      value: "",
      error: ""
    },
    date: {
      value: "",
      error: ""
    },
    cvv: {
      value: "",
      error: ""
    }
  };

  componentDidMount() {
    const { profileData } = this.props;
    this.setState({
      profileName: {
        error: "",
        value: profileData.name
      },
      card: {
        error: "",
        value: profileData.card
      },
      date: {
        error: "",
        value: profileData.date
      },
      cvv: {
        error: "",
        value: profileData.cvv
      }
    });
  }

  componentWillUnmount() {
    this.props.profileHideWarning();
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.formHasErrors) {
      return null;
    }
    const { profileName, card, date, cvv } = this.state;
    const result = {
      name: profileName.value,
      card: card.value,
      date: date.value,
      cvv: cvv.value
    };
    this.props.profileSave(result);
    this.props.profileShowWarning();
  };

  handleChange = name => event => {
    const { value } = event.target;
    const error = validate(name, value);
    if (error.length) {
      this.setState({ formHasErrors: true });
    } else {
      this.setState({ formHasErrors: false });
    }
    this.setState({
      [name]: { value, error }
    });
  };

  render() {
    const { paper, title, input, button, subtitle } = this.props.classes;
    const { profileName, card, date, cvv } = this.state;
    const { warning } = this.props;
    return (
      <>
        {!warning ? (
          <Paper className={paper}>
            <Typography className={title} variant="display1">
              Профиль
            </Typography>
            <form onSubmit={this.handleSubmit} className="ProfileForm">
              <Typography className={subtitle} variant="title">
                Способ оплаты
              </Typography>
              <div className="ProfileForm__block">
                <TextField
                  error={profileName.error.length > 0 && true}
                  required
                  className={input}
                  id="profileName"
                  label="Имя владельца"
                  value={profileName.value}
                  onChange={this.handleChange("profileName")}
                />
                {profileName.error.length > 0 && (
                  <p className="ProfileForm__error">{profileName.error}</p>
                )}
              </div>
              <div className="ProfileForm__block">
                <TextField
                  error={card.error.length > 0 && true}
                  required
                  className={input}
                  id="profileCard"
                  label="Номер Карты"
                  value={card.value}
                  onChange={this.handleChange("card")}
                />
                {card.error.length > 0 && (
                  <p className="LoginForm__error">{card.error}</p>
                )}
              </div>
              <div className="ProfileForm__block">
                <TextField
                  error={date.error.length > 0 && true}
                  required
                  className={input}
                  id="profileDate"
                  type="date"
                  label="Дата окончания действи"
                  value={date.value}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("date")}
                />
                {date.error.length > 0 && (
                  <p className="LoginForm__error">{date.error}</p>
                )}
              </div>
              <div className="ProfileForm__block">
                <TextField
                  error={cvv.error.length > 0 && true}
                  required
                  className={input}
                  id="profileCvv"
                  label="CVV"
                  value={cvv.value}
                  onChange={this.handleChange("cvv")}
                />
                {cvv.error.length > 0 && (
                  <p className="LoginForm__error">{cvv.error}</p>
                )}
              </div>

              <div className="ProfileForm__block">
                <Button
                  type="submit"
                  className={button}
                  variant="contained"
                  color="primary"
                >
                  Сохранить
                </Button>
              </div>
            </form>
          </Paper>
        ) : (
          <WarningBlock
            titleText="Профиль"
            descr="Платёжные данные обновлены. Теперь вы можете заказывать такси."
            linkText="Перейти на карту"
            link="/map"
            mod="--center"
          />
        )}
      </>
    );
  }
}

const mapDispathToProps = {
  profileSave,
  profileShowWarning,
  profileHideWarning
};
const mapStateToProps = state => ({
  profileData: getProfileData(state),
  warning: getWarning(state)
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withStyles(styles)(ProfileForm));
