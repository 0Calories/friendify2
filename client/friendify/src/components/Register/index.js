import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {

    super(props);
    this.state = {
      name: "",
      facebook: ""
    };

    handleChange = e => {
      this.setState({
        [e.target.id]: e.target.value
      })
    }

    handleSubmit = e => {
      e.preventDefault();
    }
  }

  render() {
    return(
      <div className="Register">
        <h1 className="register-title">Register</h1>
        <br></br>

        <form onSubmit={this.handleSubmit}>
          <div className="register-card">

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

export default Register