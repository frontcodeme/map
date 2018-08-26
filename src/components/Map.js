import React, { Component } from 'react'
import axios from 'axios'
// import * as dataLocations from './locations.json'
// import FilterLocations from './Filter.js'


class Map extends Component {

  render() {
    return (
      <div className="App">
      <div id="map" role="application"></div>
      </div>
    )
  }

}

export default Map
