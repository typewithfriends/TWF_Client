import './game.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Progress from '../Progress/Progress.jsx';
import TypingBox from '../TypingBox/TypingBox.jsx';
import Countdown from './Countdown.jsx';
import { changeView } from '../../actions/changeView.js'
import { getPrompt } from '../../actions/getPrompt.js'
import { getCurrentLetter } from '../../actions/getCurrentLetter.js'
import { updateProgress } from '../../actions/updateProgress.js'
import { getUsersListStats } from '../../actions/getUsersListStats.js';
import { checkGameStatus } from '../../actions/checkGameStatus.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joined: false,
      count: 5,
      len: 0,
      start: 0,
      end: 0
    }
  }

  componentDidMount() {
    this.props.socket.on('progress', (stats) => {
      this.props.getUsersListStats(stats);
    });
    
    // on emission of gameStart, get back prompt, gameInProgress, and gameStartedAll
    this.props.socket.on('prompt', prompt => {
      this.props.getPrompt(prompt);
      const len = this.props.prompt.split(' ').length;
      this.setState({ len })
    })
    
    this.props.socket.on('gameInProgress', gameInProgress => {
      this.props.checkGameStatus(gameInProgress);
    })
    
    this.props.socket.on('gameStartedAll', () => {
      // this.startGame();
      this.countdown();
    });
    
    this.props.socket.on('gameOver', username => {
      // resets state for new game
      window.removeEventListener('keydown', this.getKey);
      this.props.getPrompt(`${username} won the game!`);
      this.props.changeView('gameRoom');
      this.props.getUsersListStats([]);
      this.props.updateProgress(0);
      this.props.getCurrentLetter(0);
      this.setState({ joined: false });
      let endTime = new Date().getTime();
      this.setState({ end: endTime });
      console.log('len', this.state.len);
      console.log('time is ', this.state.len / (this.state.end - this.state.start) * 1000, 'words per minute')
    })
  }

  onJoinGameClick = (e) => {
    if (this.state.joined === false) {
      this.props.socket.emit('joinGame', this.props.username);
      this.props.changeView('inGame');
  
      // only those who joined game will show in the progress bar section.
      this.props.socket.emit('progress', {
        username: this.props.username,
        progress: this.props.progress
      });

      // FIX THIS
      // starts game when num of players reached
      if (this.props.usersListStats.length + 1 === 4) { // change this num to 4
        this.props.socket.emit('gameStart');
      }
      
      this.setState({ joined: true });
    }
  }

  countdown = () => {
    setTimeout(() => this.setState({ count: 5 }), 0);
    setTimeout(() => this.setState({ count: 4 }), 1000);
    setTimeout(() => this.setState({ count: 3 }), 2000);
    setTimeout(() => this.setState({ count: 2 }), 3000);
    setTimeout(() => this.setState({ count: 1 }), 4000);

    setTimeout(() => {
      this.setState({ count: null });
      this.startGame();
    }, 5000);
  }

  startGame = () => {
    let startTime = new Date().getTime();
    this.setState({ start: startTime });

    if (this.props.view === 'inGame') {
      console.log('game started!');
      window.addEventListener("keydown", this.getKey);
    } else if (this.props.view === 'gameRoom') {
      console.log('let\'s watch!')
    }
  }

  getKey = (e) => {
    if (e.key === this.props.prompt[this.props.currentLetter]) {
      let updatedProgress = (this.props.currentLetter + 1) / this.props.prompt.length;
      this.props.getCurrentLetter(this.props.currentLetter + 1);
      this.props.updateProgress(updatedProgress);
    }

    this.props.socket.emit('progress', {
      username: this.props.username,
      progress: this.props.progress
    });
    
    if (this.props.currentLetter === this.props.prompt.length) {
      this.props.socket.emit('gameOver', this.props.username);
      console.log('done');
    }
  }

  render() {
    return (
      <div className="game">
        <div id="progress" className="progress">
          {this.props.usersListStats.map((stat, i) => {
            return <Progress key={i} user={stat.username} progress={stat.progress} />
          })}
        </div>
        <div className="typingbox">
          {this.props.gameStatus === false ? <button onClick={this.onJoinGameClick}>Join Game!</button> : <Countdown count={this.state.count} />}
          <TypingBox />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state obj', state)
  return {
    view: state.view,
    prompt: state.prompt,
    currentLetter: state.currentLetter,
    username: state.username,
    progress: state.progress,
    usersListStats: state.usersListStats,
    gameStatus: state.gameStatus,
    // socket: state.socket
  }
}

export default connect(mapStateToProps, {
  changeView,
  getPrompt,
  getCurrentLetter,
  updateProgress,
  getUsersListStats,
  checkGameStatus
})(Game);

Game.propTypes = {
  view: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  currentLetter: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  usersListStats: PropTypes.array.isRequired,
  gameStatus: PropTypes.bool.isRequired,
  // socket: PropTypes.object.isRequired
}