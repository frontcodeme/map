import React, { Component } from 'react'
import './App.css'
import Map from './components/Map.js'
import * as dataLocations from './components/locations.json';
import InfoWindow from './components/InfoWindow.js'
import Footer from './components/Footer.js'
import FilterLocations from './components/Filter.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map />
        <Footer />
      </div>
    )
  }
}

export default App
