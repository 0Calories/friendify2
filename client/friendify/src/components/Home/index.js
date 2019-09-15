import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui'
import 'firebase/auth';
import 'firebase/firestore';
import React, { Component } from 'react';
import QRCode from 'qrcode';
import uuidv1 from 'uuid/v1'

import './Home.css'

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

  constructor(props) {

    super(props);
    this.state = {
      name: "",
      facebook: "",
      db: undefined,
      qrcode: "",
      userId: ''
    };
  }

  responseFacebook = (response) => {
    console.log(response);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleFacebookLogin = e => {
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      this.addUserToDb(user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    var id = uuidv1();
    QRCode.toDataURL(`${window.location.href}ar/${id}`).then(url => {
      this.setState({
        qrcode: url
      });
    }).then(() => {
      this.state.db.collection('users').doc(id).set({
        name: this.state.name,
        facebook: this.state.facebook,
        qrcode: this.state.qrcode
      }).then( () => {
        this.props.history.push('/qrcode/' + id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    })

  }

  addUserToDb = authResult => {
    return new Promise(resolve => {
      const user = authResult.user.uid;

      QRCode.toDataURL(`${window.location.href}ar/${user}`).then(url => {
        this.setState({
          qrcode: url
        });
      }).then(() => {
        this.state.db.collection('users').doc(user).set({
          user,
          token: authResult.credential.accessToken,
          qrcode: this.state.qrcode
        }).catch(function(error) {
          console.error("Error adding document: ", error);
        });

        resolve();
      })
    });
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig)
    this.setState({ db: firebase.firestore() });

    const uiConfig = {
      //signInSuccessUrl: `qrcode/${this.state.userId}`,
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: '<your-tos-url>',
      // Privacy policy url/callback.
      privacyPolicyUrl: function() {
        window.location.assign('<your-privacy-policy-url>');
      },
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          console.log(authResult);
          this.addUserToDb(authResult).then(() => {
            this.props.history.push('/qrcode/' + authResult.user.uid);
            return false;
          });
        }
      }
    };

    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    return(
      <div className="register">
        <form onSubmit={this.handleSubmit}>
          <div className="register-card">
            <h1>Register User</h1>

            <div className="register-row">
              <div className="register-label">Name</div>
              <div className="register-input">
                <input
                  type="text"
                  id="name"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="register-row">
              <div className="register-label">Facebook</div>
              <div className="register-input">
                <input
                  type="text"
                  id="facebook"
                  required
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div>
              <button className="register-submit" type="submit">
                Register
              </button>
            </div>

            <div id="firebaseui-auth-container"></div>

          </div>
        </form>
      </div>
    )
  }
}

export default Home;
