import React, { Component } from "react";
import { connect } from "react-redux";

import Select from "react-select";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { getIsAuthorized } from "../../modules/Login";
import { getFetchData, fetchListRequest } from "../../modules/AddressList";
import { getRouteRequest, getRouteData } from "../../modules/Routes";
import { withStyles } from "@material-ui/core";

import "./CallForm.css";

const styles = theme => ({
  title: {
    color: "black",
    textAlign: "center",
    marginBottom: "16px"
  },
  paper: {
    position: "absolute",
    top: "48px",
    left: "20px",
    zIndex: "100",
    width: "25%",
    maxWidth: "406px",
    padding: "24px",
    boxSizing: "border-box"
  },
  button: {
    marginTop: "16px"
  },
  select: {
    marginTop: "16px"
  },
  input: {
    width: "100%"
  }
});

const removeFromArray = (name, array) => {
  return array.filter(el => {
    if (el.value !== name) return el;
  });
};

class CallForm extends Component {
  state = {
    fromSelected: "",
    toSelected: "",
    bothSelected: false,
    fromList: [],
    toList: []
  };
  ifBothSelected = () => {
    return (
      this.state.fromSelected.length > 0 && this.state.toSelected.length > 0
    );
  };
  handleSubmitRoute = event => {
    event.preventDefault();
    const { fromSelected, toSelected } = this.state;
    this.props.getRouteRequest([fromSelected, toSelected]);
  };
  handleChange = (event, props) => {
    const { label } = event;
    const { name } = props;
    // eslint-disable-next-line default-case
    switch (name) {
      case "from":
        this.setState({
          fromSelected: label,
          toList: removeFromArray(label, this.state.toList)
        });
        break;
      case "to":
        this.setState({
          toSelected: label,
          fromList: removeFromArray(label, this.state.fromList)
        });
        break;
    }
    setTimeout(() => {
      if (this.ifBothSelected()) {
        this.setState({
          bothSelected: true
        });
      }
    }, 0);
  };
  componentWillMount() {
    this.props.fetchListRequest();
  }
  componentDidUpdate() {
    const list = this.props.addressList
      ? this.props.addressList.map(item => ({
          value: item,
          label: item
        }))
      : [];
    if (list.length > 0 && this.state.fromList.length === 0) {
      this.setState({ fromList: list });
    }
    if (list.length > 0 && this.state.toList.length === 0) {
      this.setState({ toList: list });
    }
  }
  render() {
    const { paper, title, button, select } = this.props.classes;
    const { bothSelected, fromList, toList } = this.state;
    return (
      <>
        <Paper className={paper}>
          <form onSubmit={this.handleSubmitRoute}>
            <Typography className={title} variant="display1">
              Вызов такси
            </Typography>
            <Select
              name={"from"}
              className={select}
              options={fromList}
              placeholder="Выберите адрес отправления"
              onChange={this.handleChange}
            />
            <Select
              name={"to"}
              className={select}
              options={toList}
              placeholder="Выберите адрес прибытия"
              onChange={this.handleChange}
            />
            <Button
              disabled={!bothSelected}
              type="submit"
              className={button}
              variant="outlined"
              color="primary"
            >
              Вызвать такси
            </Button>
          </form>
        </Paper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  addressList: getFetchData(state).addresses,
  routeData: getRouteData(state)
});

const mapDispathToProps = {
  fetchListRequest,
  getRouteRequest
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withStyles(styles)(CallForm));
