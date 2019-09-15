import React, { Component } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

class UserAr extends Component {

  render() {
    return (
      <div></div>
    )
  }

  componentDidMount() {

    const script = document.createElement("script");

    script.src = `
    AFRAME.registerComponent("button", {
      init: function() {
        this.el.addEventListener("click", (e)=>{alert('hello')})
      }
    })`;

    document.body.appendChild(script);
    
    document.body.innerHTML = reactElementToJSXString(

      <a-scene embedded arjs="trackingMethod: best;" cursor="rayOrigin: mouse; fuse: false">
        
        <a-assets>
          {/* <img id="chung" src="https://m.media-amazon.com/images/I/71uIImpdmBL._SS500_.jpg" /> */}
          <img id="chung" src="https://pbs.twimg.com/media/CvS_r8KWEAEYSzo.jpg"/>
        </a-assets>

        <a-marker preset="hiro">

          <a-plane position="0 0 0" rotation="-90 0 0" width="3" height="5" color="white" shadow material="shader: flat;">
            <a-entity layout="type: line" position="0 1.7 0">
              <a-entity position="0 0 0.5" geometry="primitive: circle; radius: 0.5" material="shader: flat; src: #chung" ></a-entity>
            </a-entity>
            <a-entity layout="type: line" position="0 -1 0">
              <a-entity position="0 0 0.1" text="align: center; width: 5; color: black; value: Barack Obama"></a-entity>
            </a-entity>
            <a-entity layout="type: line" position="0 -1.2 0">
              <a-entity position="0 0 0.5" geometry="primitive: plane; height: 0.5; width: 1.3" material="shader: flat; color: #4167B2; opacity: 0.5" button>
                <a-entity position="0 0 0.1" text="align: center; width: 5; color: black; value: Add Friend"></a-entity>
              </a-entity>
            </a-entity>
          </a-plane>

        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    );
  }
}



export default UserAr