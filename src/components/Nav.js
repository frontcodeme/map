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

  markerClicked = (venueName) => {
    // console.log(venueName);  //Working here!  [Prints Venue Name]
      this.props.markers.map((marker) => {
        console.log(venueName)
          if(marker.title === venueName) {

              window.google.maps.event.trigger(marker, 'click');
          }
      })
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
{      // <img className="foursquare" src="./public/foursquare_attr.png" srcSet="./public/foursquare_attr@2x.png" alt="Powered By Foursquare!" />
}
        <div className="search-form">
          <label htmlFor="searchQuery">Find A Place!</label>
            <input
                id="searchQuery"
                aria-label = "Enter place Name to Filter"
                type="text"
                placeholder="Search Here"
                onChange={(e) => this.updateQuery(e.target.value)} //update search values
                value={this.state.query}
          />

        </div>

         {this.state.venue.length !== 0 && (
          <ul className="search-result"
          arial-label="List Of neighbourhood places">
              {this.state.venue.map((myVenue, index) => (
                  <li
                      key={index}
                      tabIndex={index}
                      className="item"
                      onClick={() => this.markerClicked(myVenue.venue.name)}
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
