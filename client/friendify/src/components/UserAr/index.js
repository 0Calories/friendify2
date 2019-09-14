import React, { Component } from 'react';

class UserAr extends Component {

  getArRendering = () => {
    return (
      <a-scene embedded arjs>
        <a-marker preset="hiro">
          <a-box position="0 0.5 0" material="color: blue;" depth="0.2" height="10" width="5">
          </a-box>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    )
  }

  componentDidMount() {
    document.body.innerHTML = this.getArRendering();
  }
}



export default UserAr