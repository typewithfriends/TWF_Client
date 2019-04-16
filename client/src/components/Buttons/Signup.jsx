import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    document.getElementById('message').innerHTML = '';
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
          document.getElementById('message').innerHTML = 'User already exists';
          Array.prototype.slice.call(document.getElementsByClassName('signupinput')).forEach(input => {
            input.value = '';
          })
        }
      })
      .catch(err => console.error('error signing up', err));
  }

  render() {
    return (
      <div>
        <div className="signupmodal">
          <div> Username: 
            <input name='username' className='signupinput' onChange={this.onSignupKeyPress} required></input>
          </div>
          <div> Password: 
            <input name='password' className='signupinput' type='password' onChange={this.onSignupKeyPress} required></input>
          </div>
          <div> Name: 
            <input name='name' className='signupinput' onChange={this.onSignupKeyPress} required></input>
          </div>
          <div> Email: 
            <input name='email' className='signupinput' type='email' onChange={this.onSignupKeyPress} required></input>
          </div>
          <button onClick={this.onSignupSubmit}>Enter</button>
          <div id="message"></div>
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

Signup.propTypes = {
  loggedIn: PropTypes.bool.isRequired
}