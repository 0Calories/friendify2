import React, { Component } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

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

  render() {
    return (
      <p>test</p>
    )
  }

  componentDidMount() {
    document.body.innerHTML = reactElementToJSXString(
      <a-scene embedded arjs>
        <a-marker preset="hiro">
          <a-box position="0 -1 0" material="color: white;" depth="5" height="0.2" width="3">
          </a-box>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    );//React.renderToStaticMarkup(this.getArRendering());
  }
}



export default UserAr