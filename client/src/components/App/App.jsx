import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import TopBar from '../TopBar/TopBar.jsx';
import Game from '../Game/Game.jsx';
import Chat from '../Chat/Chat.jsx';
import Splash from '../Splash/Splash.jsx';
import { changeView } from '../../actions/changeView.js';
import { getUsersListStats } from '../../actions/getUsersListStats.js';

const port = 3000;
const socket = io(`http://localhost:${port}`);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getKey: null,
      socket: socket
    }
  }

  componentDidMount() {
    this.state.socket.emit('joinRoom', 'lobby');

    this.state.socket.on('progress', (stats) => {
      this.props.getUsersListStats(stats);
    });
  }

  // getKeyFn = (fn) => {
  //   this.setState({ getKey: fn });
  // }

  // getGameFocus = () => {
  //   console.log('game focused')
  //   window.addEventListener("keydown", this.state.getKey);
  // }

  // getChatFocus = () => {
  //   console.log('chat focused')
  //   window.removeEventListener('keydown', this.state.getKey);
  // }
    
  render() {
    return (
      <div>
        <TopBar />
        {
          this.props.view === 'splash' ?
          <Splash socket={this.state.socket} /> :
          <div className="mainapp">
            <Game
              getKeyFn={this.getKeyFn}
              getGameFocus={this.getGameFocus}
              socket={this.state.socket}
            />
            <Chat
              getChatFocus={this.getChatFocus}
              socket={this.state.socket}
            />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps, {
  changeView,
  getUsersListStats
})(App);
