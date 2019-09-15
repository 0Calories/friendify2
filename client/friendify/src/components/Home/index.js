import * as firebase from 'firebase/app';
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
      qrcode: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
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

  componentDidMount() {
    firebase.initializeApp(firebaseConfig)
    this.setState({ db: firebase.firestore() });
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

          </div>
        </form>
      </div>
    )
  }
}

export default Home;
