import React, { Component } from 'react';

class Footer extends Component {
  state = {}
  render() {
    return(
      <footer id="footer" tabIndex={0}>
        <div class="bottom-bar">Made with
          <span class="heart">❤</span> by
          <a target="_blank"
          href="https://github.com/frontcodeme/map"role="link" tabIndex={0}
          aria-label="Link to developers github">
          <span>M</span>
          </a>
        </div>
      </footer>
    )
  }
}

export default Footer;