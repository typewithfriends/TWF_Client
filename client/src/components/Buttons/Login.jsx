import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { getUsername } from '../../actions/getUsername.js';
import { checkLoginStatus } from '../../actions/checkLoginStatus.js';
import './buttons.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  onLoginKeyPress = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onLoginSubmit = () => {
    let { username, password } = this.state;
    this.props.getUsername(username);
    document.getElementById('message').innerHTML = '';
    axios.post('http://localhost:3000/api/users/login', {
      username,
      password
    })
      .then(({ data }) => {
        console.log('data', data);
        if (data) {
          this.props.checkLoginStatus(true);
          this.props.getUsername(username);
        } else {
          document.getElementById('message').innerHTML = 'Incorrect username or password';
        }
      })
      .catch(err => console.error('error logging in', err));
  }

  render() {
    return (
      <div className="loginmodal">
        <div> Username: 
          <input name='username' onChange={this.onLoginKeyPress}></input>
        </div>
        <div> Password: 
          <input name='password' type='password' onChange={this.onLoginKeyPress}></input>
        </div>
        <button onClick={this.onLoginSubmit}>Enter</button>
        <div id="message"></div>
      </div>
    )
  }
}

export default connect(null, {
  getUsername,
  checkLoginStatus
})(Login);