import './game.css';
import React from 'react';
import { connect } from 'react-redux';

import Progress from '../Progress/Progress.jsx';
import TypingBox from '../TypingBox/TypingBox.jsx';
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
      joined: false
    }
  }

  componentDidMount() {
    // on emission of gameStart, get back prompt, gameInProgress, and gameStartedAll
    this.props.socket.on('prompt', prompt => {
      this.props.getPrompt(prompt);
    })

    this.props.socket.on('gameInProgress', gameInProgress => {
      this.props.checkGameStatus(gameInProgress);
    })

    this.props.socket.on('gameStartedAll', () => {
      setTimeout(this.startGame, 5000);
    });

    this.props.socket.on('gameOver', username => {
      window.removeEventListener('keydown', this.state.getKey);
      this.props.changeView('gameRoom');
      this.props.getPrompt(`${username} won the game!`);
      this.props.getUsersListStats([]);
      this.props.updateProgress(0);
      this.props.getCurrentLetter(0);
      this.setState({ joined: false });
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
      if (this.props.usersListStats.length + 1 === 2) { // change this num to 4; also figure out async
        this.props.socket.emit('gameStart');
      }
    }
    this.setState({ joined: true });
  }





  startGame = () => {
    if (this.props.view === 'inGame') {
      console.log('game started!');
      window.addEventListener("keydown", this.getKey);
    } else {
      console.log('let\'s watch!')
    }
  }




  getKey = (e) => {
    if (e.key === this.props.prompt[this.props.currentLetter]) {
      let updatedProgress = (this.props.currentLetter + 1) / this.props.prompt.length;
      this.props.getCurrentLetter(this.props.currentLetter + 1);
      this.props.updateProgress(updatedProgress);
    }

    if (this.props.view === 'inGame') {
      this.props.socket.emit('progress', {
        username: this.props.username,
        progress: this.props.progress
      });
    }
    
    if (this.props.currentLetter === this.props.prompt.length) {
      this.props.socket.emit('gameOver', this.props.username);
      console.log('done');
    }
  }

  render() {
    return (
        <div onClick={this.props.getGameFocus} className="game">
        <div id="progress" className="progress">
          {this.props.usersListStats.map((stat, i) => {
            return <Progress key={i} user={stat.username} progress={stat.progress} />
          })}
        </div>
        <div className="typingbox">
          {this.props.gameStatus === false ? <button onClick={this.onJoinGameClick}>Join Game!</button> : null}
          <TypingBox />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    view: state.view,
    prompt: state.prompt,
    currentLetter: state.currentLetter,
    username: state.username,
    progress: state.progress,
    usersListStats: state.usersListStats,
    gameStatus: state.gameStatus
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