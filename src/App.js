import React, { Component } from 'react'
import './App.css'
import Map from './components/Map.js'
import * as dataLocations from './components/locations.json';
import InfoWindow from './components/InfoWindow.js'
import Footer from './components/Footer.js'
import Nav from './components/Nav.js'
// import SideNav, {MenuIcon} from 'react-simple-sidenav'
import FilterLocations from './components/Filter.js'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // locations: dataLocations,
      markers: [],
      venues: [],
    }
  }


  componentDidMount() {
    this.getVenues()
  }

  renderMap() {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBfB8UMdS7E9dAIHPW3HzKTkkjsMHg2i0I&callback=initMap')
    window.initMap = this.initMap

  }


  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "ZLDOVXNKD5BXGLUVS4A4DELSGZHSW04YCJFY1ELFQYBDHOLE",
      client_secret: "U3S2PRMH1LWEI3MDV3OKHAYHVOFKDWY0VJOIMT45SZESCFGA",
      query: "food",
      ll: "35.7594651,-5.833954299999999",
      radius: "10000",
      v: "20182608"
  }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        console.log(response.data.response.groups[0].items)
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap(),
        console.log(this.state.venues)
        )
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })
  }

  initMap = () => {
    // const { locations, markers } = this.state
    var largeInfowindow = new window.google.maps.InfoWindow();
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: { lat: 35.78, lng: -5.81 },
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: window.google.maps.ControlPosition.TOP_CENTER
      },
    })

      // Create An InfoWindow
      var infowindow = new window.google.maps.InfoWindow()
      var bounds = new window.google.maps.LatLngBounds();

      this.state.venues.map(myVenue => {
      var contentString = `Name: ${myVenue.venue.name}
        Address: ${myVenue.venue.location.address}`

      // Create A Marker
      var marker = new window.google.maps.Marker({
        // position: { lat: 35.7594651, lng: -5.833954299999999 }, //Testing init map
        // Here!!! replace the position & title with the locations.json
        position: {
          lat: myVenue.venue.location.lat ,
          lng: myVenue.venue.location.lng
        },
        map: map,
        title: myVenue.venue.name,
        location: myVenue.venue.location.address
      })

        // Click on A Marker!
        marker.addListener('click', function() {
          // bounds.extend(marker.position);
          // Extend the boundaries of the map for each marker
          // map.fitBounds(bounds);

          // Change the content
          infowindow.setContent(contentString)

          // Open An InfoWindow
          infowindow.open(map, marker)
        })
      })
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <Map />
        <Footer />
      </div>
    )
  }
}

export default App

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