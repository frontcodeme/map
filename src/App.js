import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
// components
import Nav from './components/Nav.js'
import Map from './components/Map.js'
import Footer from './components/Footer.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // locations: dataLocations,
      markers: [],
      allVenues: [],
      venues: [],
      latLng: "35.78, -5.81"
    }
  }


  componentDidMount() {
    this.getVenues("food", "Tangiers")
  }

  renderMap() {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBfB8UMdS7E9dAIHPW3HzKTkkjsMHg2i0I&callback=initMap')
    window.initMap = this.initMap

  }


  getVenues = (query, location) => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "ZLDOVXNKD5BXGLUVS4A4DELSGZHSW04YCJFY1ELFQYBDHOLE",
      client_secret: "U3S2PRMH1LWEI3MDV3OKHAYHVOFKDWY0VJOIMT45SZESCFGA",
      query: query,
      near: location,

      v: "20182608"
  }
    // Fetching data from API
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items,
          allVenues: response.data.response.groups[0].items,

        }, this.renderMap(),
        console.log(this.state.venues),
        console.log(this.state.allVenues)
        )
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })
  }

  initMap = () => {
    var largeInfowindow = new window.google.maps.InfoWindow();
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: { lat: 35.78, lng: -5.81 },
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: window.google.maps.ControlPosition.TOP_RIGHT
      },
    })

      // Create An InfoWindow
      var infowindow = new window.google.maps.InfoWindow({
        // Assign a maximum value for the width of the infowindow allows
        // greater control over the various content elements
        maxWidth: 300
      })

      this.state.venues.map(myVenue => {

      var contentString =
      `<div id="iw-container">
      <h1 class="iw-title"class="iw-title">
        ${myVenue.venue.name}
      </h1>
      <p class="iw-content"> <div class="iw-subTitle"><b>Address: </b></br></div>
                ${myVenue.venue.location.formattedAddress[0]}
                ${myVenue.venue.location.formattedAddress[1]}
                ${myVenue.venue.location.formattedAddress[2]}
      </p>`

      // Create A Marker
      var marker = new window.google.maps.Marker({
        title: myVenue.venue.name,
        position: {
          lat: myVenue.venue.location.lat ,
          lng: myVenue.venue.location.lng
        },
        map: map,
        location: myVenue.venue.location.address,
        animation: window.google.maps.Animation.DROP,
      })

        // Add each created marker to the 'markers' array
        this.state.markers.push(marker)

        // Click on A Marker!
        marker.addListener('click', function() {

          // Change the content
          infowindow.setContent(contentString)

          // Open An InfoWindow
          infowindow.open(map, marker)

          // Animate The Marker
          if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
          } else {
              marker.setAnimation(window.google.maps.Animation.BOUNCE);
          }
        })
      })
  }

updateVenues = (newVenues) => {
  this.setState({venue: newVenues})
}
  render() {
    return (
      <div className="App">
        <Nav
          venue={this.state.allVenues}
          markers={this.state.markers}
          updateVenues={this.updateVenues}
        />
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