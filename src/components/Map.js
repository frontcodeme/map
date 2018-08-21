import React, { Component } from 'react'
import * as dataLocations from './locations.json'
import InfoWindow from './InfoWindow.js'
import FilterLocations from './Filter.js'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: dataLocations,
      map: '',
      markers: [],
      infoWindowIsOpen: false,
      infoContent: ''
    }
  }

  componentDidMount() {
    window.initMap = this.initMap
    parseHtml('https://maps.googleapis.com/maps/api/js?key=AIzaSyA-cxVbqryrikvhCdgcGhzjEIlC5Pwmz0o&callback=initMap')
  }

  initMap = () => {
    let controlledThis = this
    const { locations, markers } = this.state

    /* Define the map */
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: 35.7594651, lng: -5.833954299999999 }
    })

    /* Keep state in sync */
    this.setState({
      map
  })

    /*  The following group uses the location array to create an array of markers on initialize. */
    for (let i = 0; i < locations.length; i++) {
      /* Get the position from the location array. */
      let position = locations[i].position
      let title = locations[i].title
      let id = locations[i].key

      /* Create a marker per location, and put into markers array. */
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: id
      })

      /* Push the marker to our array of markers */
      markers.push(marker)

      /* Create an onclick event to open an infowindow at each marker */
      marker.addListener('click', function () {
        controlledThis.openInfoWindow(marker)
      })
    }
  }

  openInfoWindow = (marker) => {
    this.setState({
      infoWindowIsOpen: true,
      selectedMarker: marker
    });
  }

  closeInfoWindow = () => {
    this.setState({
      infoWindowIsOpen: false,
      selectedMarker: {}
    });
  }

  render() {
    return (
      <div className="App">
        <FilterLocations
          locationsList={this.state.locations}
          markers={this.state.markers}
          openInfoWindow={this.openInfoWindow}
        />
        {
          this.state.infoWindowIsOpen &&
          <InfoWindow
            selectedMarker={this.state.selectedMarker}
            infoContent={this.state.infoContent}
          />
        }
      <div id="map" role="application"></div>
      </div>
    )
  }

}

export default Map

function parseHtml(src) {
  let ref = window.document.getElementsByTagName('script')[0]
  let script = window.document.createElement('script')

  script.src = src
  script.async = true
  ref.parentNode.insertBefore(script, ref)

  script.onerror = function () {
    document.write('Load error: Google Maps couldn\'t load correctly' )
  }
}