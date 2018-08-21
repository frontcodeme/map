import React, { Component } from 'react'
import * as dataLocations from './locations.json'
import InfoWindow from './InfoWindow.js'

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

    /* Create a marker for each location in the locations.json file */
    for (let i = 0; i < locations.length; i++) {
      /* Define the values of the properties */
      let position = locations[i].position
      let title = locations[i].title
      let id = locations[i].key

      /* Create the marker itself */
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: id
      })

      /* Get those markers into the state */
      markers.push(marker)

      /* Open infoWindow when click on the marker */
      marker.addListener('click', function () {
        controlledThis.openInfoWindow(marker)
      })
    }
  }

  openInfoWindow = (marker) => {
    this.setState({
      infoWindowIsOpen: true,
      currentMarker: marker
    });
  }

  closeInfoWindow = () => {
    this.setState({
      infoWindowIsOpen: false,
      currentMarker: {}
    });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.infoWindowIsOpen &&
          <InfoWindow
            currentMarker={this.state.currentMarker}
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