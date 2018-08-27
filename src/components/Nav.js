import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import escapeRegExp from 'escape-string-regexp'

class Nav extends React.Component {

  state = {
    query: '',
    venue: this.props.venue
  }


    updateQuery = (query) => {
        this.setState({ query })

        let allVenues = this.props.venue
        let newVenues

        if(this.state.query && (this.state.query !== '')) {
            const match = new RegExp(escapeRegExp(query), 'i');
            newVenues = allVenues.filter((myVenue) => match.test(myVenue.venue.name))
            this.setState({venue: newVenues})
            this.props.updateVenues(newVenues)
        } else {
            this.setState({venue: allVenues})
        }
    }

    triggerMarkerClick = (venueTitle) => {
        this.props.markers.map((marker) => {
            if(marker.title === venueTitle) {
                window.google.maps.event.trigger(marker, 'click');
            }
        })
    }
      showSettings (event) {
    event.preventDefault()
  }
  render () {
    // nav sidebar styles
    var styles = {
          bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px'
          },
          bmBurgerBars: {
            background: '#d60000'
          },
          bmCrossButton: {
            height: '24px',
            width: '24px'
          },
          bmCross: {
            background: '#bdc3c7'
          },
          bmMenu: {
            background: '#373a47',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
          },
          bmMorphShape: {
            fill: '#373a47'
          },
          bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
          },
          bmItem: {
            display: 'inline-block'
          },
          bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
          }
    }
    return (
      <Menu styles={ styles }>
        <div className="search-form">
          <label htmlFor="searchQuery">Find A Place!</label>
            <input
                id="searchQuery"
                aria-labelledby="filter"
                type="text"
                placeholder="Search Here"
                onChange={(e) => this.updateQuery(e.target.value)}
                value={this.state.query}
          />
          <img
          className="foursquare"
          src="./public/foursquare_attr.png"
          srcSet="./public/foursquare_attr@2x.png"
          alt="Powered By Foursquare!"
          />
        </div>

         {this.state.venue.length !== 0 && (
          <ul className="search-result">
              {this.state.venue.map((myVenue, index) => (
                  <li
                      key={index}
                      tabIndex={index}
                      className="item"
                      onClick={() => this.triggerMarkerClick(myVenue.venue.name)}
                  >
                      {myVenue.venue.name}
                  </li>
              ))}
          </ul>
        )}

        {this.state.venue === 0 && (
            <ul className="search-result">
                <li className="item">No Places Found..</li>
            </ul>
        )}

      </Menu>
    );
  }
}

export default Nav
