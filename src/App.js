import React, { Component } from 'react'
import './App.css'
import Map from './components/Map.js'
import InfoWindow from './components/InfoWindow.js'
import Footer from './components/Footer.js'
import Filter from './components/Filter.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Filter />
        <Map />
        <Footer />
      </div>
    )
  }
}

export default App
