import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import React, { Component } from 'react'

import './qrcode.css'

const firebaseConfig = {
  apiKey: "AIzaSyCZyDY8jUIq0O6TwEllM5Ee03ZJz9-Oihg",
  authDomain: "hack-the-north-2019-97ff8.firebaseapp.com",
  databaseURL: "https://hack-the-north-2019-97ff8.firebaseio.com",
  projectId: "hack-the-north-2019-97ff8",
  storageBucket: "hack-the-north-2019-97ff8.appspot.com",
  messagingSenderId: "413203675897",
  appId: "1:413203675897:web:c54247f64e6b5ca9c48028"
};

class QRCode extends Component {

  constructor(props) {
    super(props);
    this.state = {
      qrcode: ""
    };
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    var db = firebase.firestore();

    var location = this.props.location['pathname'].split('/');
    var userID = location[location.length - 1];
    
    var docRef = db.collection("users").doc(userID);
    docRef.get().then(doc => {
      if (doc.exists) {
        console.log(doc.data());
        this.setState({
          qrcode: doc.data()['qrcode']
        });
      }
    })
  }

  getQRCode = () => {
    if (this.state.qrcode) {
      return (
        <img src={this.state.qrcode} alt="qrcode"></img>
      )
    }
    return null;
  }
  
  render() {
    return(
      <div className="qrcode">
        <this.getQRCode className="qrcodeImage"></this.getQRCode>
      </div>
    )
  }
}

export default QRCode