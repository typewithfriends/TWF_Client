import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { getUsername } from '../../actions/getUsername.js';
import { checkLoginStatus } from '../../actions/checkLoginStatus.js';
import './buttons.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      email: ''
    }
  }

  onSignupKeyPress = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSignupSubmit = () => {
    let { username, password, name, email } = this.state;
    axios.post('http://localhost:3000/api/users/signup', {
      username,
      password,
      name,
      email
    })
      .then(({ data }) => {
        if (data) {
          this.props.checkLoginStatus(true);
          this.props.getUsername(username);
        } else {
          console.log('User already exists');
        }
      })
      .catch(err => console.error('error signing up', err));
  }

  render() {
    return (
      <div>
        <div className="signupmodal">
          <div> Username: 
            <input name='username' onChange={this.onSignupKeyPress} required></input>
          </div>
          <div> Password: 
            <input name='password' onChange={this.onSignupKeyPress} required></input>
          </div>
          <div> Name: 
            <input name='name' onChange={this.onSignupKeyPress} required></input>
          </div>
          <div> Email: 
            <input name='email' onChange={this.onSignupKeyPress} required></input>
          </div>
          <button onClick={this.onSignupSubmit}>Enter</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, {
  getUsername,
  checkLoginStatus
})(Signup);