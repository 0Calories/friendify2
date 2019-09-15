import React, { Component } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

class UserAr extends Component {

  render() {
    return (
      <p>test</p>
    )
  }

  componentDidMount() {
    document.body.innerHTML = reactElementToJSXString(
      <a-scene embedded arjs="trackingMethod: best;">
        
        <a-assets>
          <img id="chung" src="https://m.media-amazon.com/images/I/71uIImpdmBL._SS500_.jpg" />
        </a-assets>

        <a-marker preset="hiro">

          <a-plane position="0 0 0" rotation="-90 0 0" width="3" height="5" color="white" shadow material="shader: flat;">
            <a-entity position="1.5 1.5 0.1" text="width: 5; color: black; value: Hello world!"></a-entity>
            <a-entity position="-1 0 0" geometry="primitive: plane; height: 1; width: 1" material="shader: flat; src: #chung"></a-entity>
            <a-entity position="-1 0 0" geometry="primitive: plane; height: 0.5; width: 1" material="shader: flat; color: #4167B2"></a-entity>
          </a-plane>

        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    );
  }
}



export default UserAr