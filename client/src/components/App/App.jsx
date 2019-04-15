import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

import MainApp from '../MainApp/MainApp.jsx';
import Signup from '../Buttons/Signup.jsx';
import Login from '../Buttons/Login.jsx';
import Stats from '../Buttons/Stats.jsx';

import './app.css';

import { changeView } from '../../actions/changeView.js';
import { getUsername } from '../../actions/getUsername.js';
import { getUsersListStats } from '../../actions/getUsersListStats.js';
import { checkGameStatus } from '../../actions/checkGameStatus.js';
import { getPrompt } from '../../actions/getPrompt.js';
import { checkLoginStatus } from '../../actions/checkLoginStatus.js';

const port = 3000;
// const socket = io(`http://13.57.15.90:${port}`);
const socket = io(`localhost:${port}`);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socket
    }
  }

  componentDidMount() {
    let randNum = Math.floor(Math.random() * 10000) + 1;
    this.props.getUsername('Guest' + randNum);
    this.props.changeView('gameRoom');

    // this.state.socket.emit('joinRoom', 'lobby'); 

    // gets game status and prompt for new joiners.
    this.state.socket.on('welcome', startInfo => {
      const { gameInProgress, prompt, players } = startInfo;
      this.props.checkGameStatus(gameInProgress);
      this.props.getPrompt(prompt);
      this.props.getUsersListStats(players);
    })

    // shows progress of players in game.
    this.state.socket.on('progress', (stats) => {
      this.props.getUsersListStats(stats);
    });
  }

  signUserOut = () => {
    this.props.checkLoginStatus(false);
    let randNum = Math.floor(Math.random() * 10000) + 1;
    this.props.getUsername('Guest' + randNum);
  }

  render() {
    return (
      <div>
        <div className="nav">
          <div className="logo">Type With Friends</div>
          <div className="buttoncontainer">
            <div className="button"><Link to='/'>Game</Link></div>
            {this.props.loggedIn && <div className="button"><Link to='/stats'>Stats</Link></div>}
            {!this.props.loggedIn && <div className="button"><Link to='/login'>Log In</Link></div>}
            {this.props.loggedIn && <div className="button" onClick={this.signUserOut}><Link to='/'>Log Out</Link></div>}
            {!this.props.loggedIn && <div className="button"><Link to='/signup'>Sign Up</Link></div>}
          </div>
        </div>
        <Switch>
          <Route path='/' exact render={(props) => <MainApp {...props} socket={this.state.socket} />} />
          <Route path='/stats' component={Stats} />
          <Route path='/login' render={() => (this.props.loggedIn ? (<Redirect to='/' />) : (<Login loginUser={this.loginUser} />))} />
          <Route path='/signup' render={() => (this.props.loggedIn ? (<Redirect to='/' />) : (<Signup loginUser={this.loginUser} />))} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.view,
    gameStatus: state.gameStatus,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, {
  changeView,
  getUsername,
  getUsersListStats,
  checkGameStatus,
  getPrompt,
  checkLoginStatus
})(App);

App.propTypes = {
  view: PropTypes.string.isRequired,
  gameStatus: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired
}