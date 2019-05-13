import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import Header from "../Header";
import LoginForm from "../LoginForm";
import ProfileForm from "../ProfileForm";
import PrivateRoute from "../PrivateRoute";
import Map from "../Map";

import { getIsAuthorized, authSuccess } from "../../modules/Login";
import { profileSave } from "../../modules/Profile";

import "./app.css";

class RootRouter extends Component {
  componentWillMount() {
    if (localStorage.isLogged) {
      this.props.authSuccess();
    }
    if (localStorage.profile) {
      this.props.profileSave(JSON.parse(localStorage.profile));
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="App__content">
            <Switch>
              <Redirect exact from="/" to="/map" />
              <Route path="/login" component={LoginForm} />
              <PrivateRoute
                path="/profile"
                to="/login"
                component={ProfileForm}
              />
              <PrivateRoute path="/map" to="/login" component={Map} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({ isAuthorized: getIsAuthorized(state) });

const mapDispathToProps = { profileSave, authSuccess };

export default connect(
  mapStateToProps,
  mapDispathToProps
)(RootRouter);
