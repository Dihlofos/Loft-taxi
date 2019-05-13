import React, { Component } from "react";
import { connect } from "react-redux";
import mapboxgl from "mapbox-gl";
import WarningBlock from "../WarningBlock";
import RepeatBlock from "../RepeatBlock";
import CallForm from "../CallForm";
import { getProfileData } from "../../modules/Profile";
import { getRouteData, routeClear } from "../../modules/Routes";

import "./Map.css";

class Map extends Component {
  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoianVuZXBhaWsiLCJhIjoiY2p2ajZycXRuMGNudTN6bWdzaDY4dGZ0eSJ9.pRnXDsoc2IyWKfhI-TvHzw";
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [30.2656504, 59.8029126],
      zoom: 15
    });
  }
  componentWillUnmount() {
    this.map.remove();
    this.props.routeClear();
  }
  writeRoute = () => {
    const { route } = this.props;
    if (route.length > 0) {
      this.map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route
            }
          }
        },
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#c2423a",
          "line-width": 8
        }
      });
      this.map.flyTo({
        center: route[0],
        zoom: 15
      });
    } else if (this.map.getLayer("route") !== undefined) {
      this.map.removeLayer("route");
      this.map.removeSource("route");
    }
  };
  render() {
    const { profileData, route } = this.props;
    const ifProfile = Object.keys(profileData).length !== 0;
    if (this.map !== null) {
      this.writeRoute();
    }

    return (
      <>
        {ifProfile ? (
          route.length > 0 ? (
            <RepeatBlock
              titleText="Заказ размещён"
              descr="Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут."
              linkText="Сделать новый заказ"
            />
          ) : (
            <CallForm map={this.map} />
          )
        ) : (
          <WarningBlock
            titleText="Заполните платежные данные"
            descr="Укажите информацию о банковской карте, чтобы сделать заказ."
            linkText="Перейти в профиль"
            link="/profile"
          />
        )}

        <div className="Map" ref={this.mapContainer} />
      </>
    );
  }
}
const mapDispathToProps = {
  routeClear
};

const mapStateToProps = state => ({
  profileData: getProfileData(state),
  route: getRouteData(state)
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Map);
