import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'

class Nav extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
      var styles = {
          bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px'
          },
          bmBurgerBars: {
            background: '#373a47'
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
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    );
  }
}

export default Nav

// import SideNav, {MenuIcon} from 'react-simple-sidenav'

// class Nav extends Component {
//   render() {
//     return(
//       <div>
//         <MenuIcon onClick={() => this.setState({showNav: true})}/>
//         <SideNav
//           showNav = {this.state.showNav}
//           onHideNav = {() => this.setState({showNav: false})} />
//       </div>
//     )
//   }
// }

// export default Nav

 {// <nav className="col-2 collapse bg-inverse pt-2 h-100 sidebar_width" id="sidebar">
                                // <h4 className="app_title text-white">Neighborhood Map</h4>
                                // <input className="search" data-bind="textInput: searchOption, valueUpdate: 'afterkeydown'"
                                // placeholder="Search Locations...">
                                // <hr className="sidebar_hr">
                                // <ul className="nav flex-column"
                                // data-bind="foreach: myLocationsFilter">
                                //     <a href="#"><li className="nav-item text-white location_list"
                                //     data-bind="text: title, click: $parent.populateAndBounceMarker"></li></a>
                                // </ul>
                                // <img className="foursquare"
                                // src="img/foursquare_attr.png" srcset="img/foursquare_attr@2x.png"
                                // alt="Powered By Foursquare!">
                                // </nav>
                              }