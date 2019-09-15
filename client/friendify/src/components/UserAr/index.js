import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import React, { Component } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

// TODO: This is DISGUSTINGLY bad practice, but this is a hackathon so ya yeet
const firebaseConfig = {
  apiKey: "AIzaSyCZyDY8jUIq0O6TwEllM5Ee03ZJz9-Oihg",
  authDomain: "hack-the-north-2019-97ff8.firebaseapp.com",
  databaseURL: "https://hack-the-north-2019-97ff8.firebaseio.com",
  projectId: "hack-the-north-2019-97ff8",
  storageBucket: "hack-the-north-2019-97ff8.appspot.com",
  messagingSenderId: "413203675897",
  appId: "1:413203675897:web:c54247f64e6b5ca9c48028"
};

class UserAr extends Component {

  state = {
    user: '',
    token: '',
    name: '',
    profilePic: ''
  };

  render() {
    return (
      <div></div>
    )
  }

  componentDidMount() {

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    const db = firebase.firestore();
    const location = this.props.location['pathname'].split('/');
    const userID = location[location.length - 1];
    const docRef = db.collection("users").doc(userID);

    console.log('USERID ' + userID);
    console.dir(docRef);

    docRef.get().then(doc => {
      if (doc.exists) {
        const token = doc.data().token;
        const user = doc.data().user;

        this.setState({ token, user }, () => {
          console.log(this.state);
          this.embedAR();
        });
      }
    });
  }

  embedAR = () => {
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

          <a-plane position="0 0 0" rotation="-90 0 0" width="1.5" height="1.5" color="white" shadow material="shader: flat;">
            <a-entity layout="type: line" position="0 0.25 0">
              <a-entity position="0 0.5 0.1" geometry="primitive: circle; radius: 0.25" material="shader: flat; src: #chung" ></a-entity>
            </a-entity>
            <a-entity layout="type: line" position="0 0.15 0.1">
              <a-entity position="0 0 0" text="align: center; width: 2.5; color: black; value: Barack Obama"></a-entity>
            </a-entity>
            <a-entity position="0 -0.5 0">
              <a-entity position="0 0.1 0" geometry="primitive: plane; height: 0.2; width: 0.6" material="shader: flat; color: #4167B2;" button>
                <a-entity position="0 0 0.05" text="align: center; width: 2; color: black; value: Add Friend"></a-entity>
              </a-entity>
              <a-entity position="0 -0.5 0" geometry="primitive: plane; height: 0.15; width: 1.5" material="shader: flat; color: #4167B2;"></a-entity>
            </a-entity>
          </a-plane>

        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    );
  }
}



export default UserAr