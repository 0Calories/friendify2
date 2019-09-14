import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyCZyDY8jUIq0O6TwEllM5Ee03ZJz9-Oihg",
  authDomain: "hack-the-north-2019-97ff8.firebaseapp.com",
  databaseURL: "https://hack-the-north-2019-97ff8.firebaseio.com",
  projectId: "hack-the-north-2019-97ff8",
  storageBucket: "hack-the-north-2019-97ff8.appspot.com",
  messagingSenderId: "413203675897",
  appId: "1:413203675897:web:c54247f64e6b5ca9c48028"
};

class Home extends Component {

  state = {
    db: undefined
  };

  componentDidMount() {
    firebase.initializeApp(firebaseConfig)
    this.setState({ db: firebase.firestore() });
  }

  handleClick = () => {
    this.state.db.collection('users').add({
      name: 'Lilliam Pumpernickel'
    }).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return(
      <div>
        <h1>Hi</h1>
        <button onClick={this.handleClick}>Test Firebase</button>
      </div>
    )
  }
}

export default Home;
