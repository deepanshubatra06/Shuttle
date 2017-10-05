import React, { Component } from 'react';
import {render} from 'react-dom';

// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";


import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";

const MapContainer2 = compose(
  withProps({

  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true
  });
      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.waypoints[0].lat,this.props.waypoints[0].lng),
         waypoints:this.props.getWaypoints(),
        destination: new google.maps.LatLng(this.props.waypoints[this.props.wayLength-1].lat, this.props.waypoints[this.props.wayLength-1].lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {

        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={new google.maps.LatLng(props.waypoints[0].lat, props.waypoints[0].lng)}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={0}
    >
      {props.waypoints.map(marker => (
        <Marker
          animation={google.maps.Animation.DROP}
          zIndex={10}
          icon={{
            url: 'http://205.166.161.233/MyRide/css/ico/bus_pointer.svg',
        scaledSize: new google.maps.Size(20,20)
          }}
          key={marker.lat+marker.lng}
          position={{ lat: marker.lat, lng: marker.lng}}
        />
      ))}
    </MarkerClusterer>
    <Marker
      animation={google.maps.Animation.BOUNCE}
      zIndex={100}
       position={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
  icon={{
    url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/31771-200.png',
scaledSize: new google.maps.Size(34,34)
  }}/>

    {props.directions && <DirectionsRenderer options={{suppressMarkers: true}} directions={props.directions} />}
  </GoogleMap>
);

export default MapContainer2;
