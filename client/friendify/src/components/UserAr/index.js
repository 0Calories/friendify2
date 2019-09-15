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
      <p>test</p>
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
    document.body.innerHTML = reactElementToJSXString(
      <a-scene embedded arjs="trackingMethod: best;">
        
        <a-assets>
          <img id="chung" src="https://m.media-amazon.com/images/I/71uIImpdmBL._SS500_.jpg" />
        </a-assets>

        <a-marker preset="hiro">

          <a-plane position="0 0 0" rotation="-90 0 0" width="3" height="5" color="white" shadow material="shader: flat;">
            <a-entity position="1.5 1.5 0.1" text={`width: 5; color: black; value: ${this.state.name}`}></a-entity>
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