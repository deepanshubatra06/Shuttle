import React from "react";
import {render} from 'react-dom';
import MapContainer2 from './MapContainer2.js';

class Main extends React.Component {
    constructor() {
        super();
        this.getWaypoints=this.getWaypoints.bind(this);
        this.waypoints=[
{
lat: 28.412839,
lng: 77.041664
},
{
lat: 28.421507,
lng: 77.039018
},
{
lat: 28.427017,
lng: 77.037505
},
{
lat: 28.429536,
lng: 77.040552
},
{
lat: 28.432287,
lng: 77.046930
},
{

lat: 28.437011,
lng: 77.045957
},
{
lat: 28.442948,
lng: 77.038161
},
{
lat: 28.448240,
lng: 77.038023
},
{
lat: 28.453622,
lng: 77.043232
},
{
lat: 28.463078,
lng: 77.052115
},
{
lat: 28.489606,
lng: 77.080004
},
{
lat: 28.498286,
lng: 77.088410
},
{
lat: 28.503162,
lng: 77.088471
},
{
lat: 28.506467,
lng: 77.083922
},
{
lat: 28.509734,
lng: 77.079330
}
];
this.state={
  currentLocation:this.waypoints[0]
}
    }

    getWaypoints(){
      var waypointsArray=[];
      var self=this;
      this.waypoints.forEach((waypoint,index)=>{
        if(index%2==0)
        waypointsArray.push({location: new google.maps.LatLng(waypoint.lat,waypoint.lng),stopover: true});
      });
      return waypointsArray;
      // return [{location: new google.maps.LatLng(28.437011,77.045957),stopover: true}];
    }
    componentWillMount(){

    }
    render() {
        return <div>
          {/* <MapContainer /> */}
          <MapContainer2 isMarkerShown={true}
            googleMapURL= "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement= {<div style={{ height: `500px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            center={{ lat: 28.41, lng: 77.04 }}
            getWaypoints={this.getWaypoints}
            waypoints={this.waypoints}
            wayLength={this.waypoints.length}
            currentLocation={this.state.currentLocation}
  />
        </div>;
    }

    componentDidMount(){
      this.index=0;
      var self=this;
setInterval(function(){
  if(self.waypoints[self.index]){
    self.setState({
      currentLocation:self.waypoints[self.index]});
      self.index++;
    }
  },1000);
    }
}

render((
    <Main/>
), document.getElementById('main'));
