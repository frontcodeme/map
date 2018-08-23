import React, { Component } from 'react'
import axios from 'axios'

// import * as dataLocations from './locations.json'
// import InfoWindow from './InfoWindow.js'
// import FilterLocations from './Filter.js'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      venues: [],
      // locations: dataLocations,
      map: '',
      markers: [],
    }
  }

  componentDidMount() {
    this.getVenues()
    window.initMap = this.initMap
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBfB8UMdS7E9dAIHPW3HzKTkkjsMHg2i0I&callback=initMap')
  }


  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "ZLDOVXNKD5BXGLUVS4A4DELSGZHSW04YCJFY1ELFQYBDHOLE",
      client_secret: "U3S2PRMH1LWEI3MDV3OKHAYHVOFKDWY0VJOIMT45SZESCFGA",
      query: "musume",
      near: "Tangiers",
      v: "20182308"
  }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })

  }

  initMap = () => {
    const { locations, markers } = this.state
    var largeInfowindow = new window.google.maps.InfoWindow();
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: 35.7594651, lng: -5.833954299999999 },
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: window.google.maps.ControlPosition.LEFT_TOP
      },
    })
    /* Keep state in sync */
    this.setState({
      map
  })
    var bounds = new window.google.maps.LatLngBounds();

    // Create A Marker
    var marker = new window.google.maps.Marker({
      position: { lat: 35.7594651, lng: -5.833954299999999 },
      map: map,
      title: 'Hello'
    })
{    // /*  The following group uses the location array to create an array of markers on initialize. */
    // for (let i = 0; i < locations.length; i++) {
    //   /* Get the position from the location array. */
    //   let position = locations[i].position
    //   let title = locations[i].title
    //   let id = locations[i].key

    //   /* Create a marker per location, and put into markers array. */
    //   let marker = new window.google.maps.Marker({
    //     map: map,
    //     position: position,
    //     title: title,
    //     animation: window.google.maps.Animation.DROP,
    //     id: id
    //   })
}

      /* Get those markers into the state */
      markers.push(marker)

      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', function() {
        popInfoWindow(this, largeInfowindow);
      });
{
    //   bounds.extend(markers[i].position);
    // }
    // // Extend the boundaries of the map for each marker
    // map.fitBounds(bounds);
}
    function popInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
    }
}

  render() {
    return (
      <div className="App">
{
// <FilterLocations
//           locationsList={this.state.locations}
//           markers={this.state.markers}
//         />
}
      <div id="map" role="application"></div>
      </div>
    )
  }

}

export default Map

function loadScript(src) {
  let index = window.document.getElementsByTagName('script')[0]
  let script = window.document.createElement('script')

  script.src = src
  script.async = true
  index.parentNode.insertBefore(script, index)

  script.onerror = function () {
    document.write('Load error: Google Maps couldn\'t load correctly' )
  }
}