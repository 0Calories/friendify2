import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class UserAr extends Component {

  componentDidMount() {
    var element = 
      <a-scene embedded arjs>
        <a-marker preset="hiro">
          <a-box position='0 0.5 0' material='color: yellow;'></a-box>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>

    ReactDOM.render(
      <div></div>,
      document.body.insertBefore(element, document.getElementById('root'))
    )
  }

  render() {
    return (
      <div className="UserAr">
      </div>
    );
  }
}

export default UserAr