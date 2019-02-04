import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import TopBar from '../TopBar/TopBar.jsx';
import Game from '../Game/Game.jsx';
import Chat from '../Chat/Chat.jsx';
import Splash from '../Splash/Splash.jsx';
import { changeView } from '../../actions/changeView.js';
import { getUsersListStats } from '../../actions/getUsersListStats.js';
import { checkGameStatus } from '../../actions/checkGameStatus.js';
import { getPrompt } from '../../actions/getPrompt.js';

const port = 3000;
const socket = io(`http://localhost:${port}`);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socket
    }
  }

  componentDidMount() {
    this.state.socket.emit('joinRoom', 'lobby'); 

    // gets game status and prompt for new joiners.
    this.state.socket.on('welcome', startInfo => {
      const { gameInProgress, prompt, players } = startInfo;
      this.props.checkGameStatus(gameInProgress);
      this.props.getPrompt(prompt);
      this.props.getUsersListStats(players);
    })

    // shows progress of players in game.
    // needed to remove 'let's play' button for new joiners.
    this.state.socket.on('progress', (stats) => {
      this.props.getUsersListStats(stats);
    });
  }
    
  render() {
    return (
      <div>
        <TopBar />
        {
          this.props.view === 'splash' ?
          <Splash socket={this.state.socket} /> :
          <div className="mainapp">
            <Game
              socket={this.state.socket}
            />
            <Chat
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
    view: state.view,
    gameStatus: state.gameStatus
  }
}

export default connect(mapStateToProps, {
  changeView,
  getUsersListStats,
  checkGameStatus,
  getPrompt
})(App);
