import React, { PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getIsAuthorized } from "../../modules/Login";

class PrivateRoute extends PureComponent {
  render() {
    const { isAuthorized, component, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
  renderRoute = props => {
    const { isAuthorized, to, component: Component } = this.props;
    return isAuthorized ? <Component {...props} /> : <Redirect to={to} />;
  };
}

const mapStateToProps = state => ({ isAuthorized: getIsAuthorized(state) });

export default connect(mapStateToProps)(PrivateRoute);
