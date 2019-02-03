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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joined: false,
      gotPrompt: false,
      play: false
    }
  }

  componentDidMount() {
    // this.props.getKeyFn(this.getKey);

  
    if (this.state.gotPrompt === false) {
      this.props.socket.on('prompt', prompt => {
        prompt = prompt.quotes[0].quote;
        this.props.getPrompt(prompt);
      })
    }
    this.setState({ gotPrompt: true });

    this.props.socket.on('gameStartedAll', () => {
      setTimeout(this.startGame, 5000);
    });

    this.props.socket.on('gameOver', username => {
      console.log(username, 'won the game!');
      window.removeEventListener('keydown', this.state.getKey);
      this.props.changeView('gameRoom');
      this.props.getUsersListStats([]);
      this.setState({ joined: false });
      this.setState({ play: true });
    })
  }

  onJoinGameClick = (e) => {
    if (this.state.joined === false) {
      this.props.socket.emit('joinGame', this.props.username);
      this.props.changeView('inGame');
  
      this.props.socket.emit('progress', {
        username: this.props.username,
        progress: this.props.progress
      });

      this.props.socket.on('progress', (stats) => {
        this.props.getUsersListStats(stats);
      });

      console.log('length', this.props.usersListStats);
      if (this.props.usersListStats.length + 1 === 2) { // change this num to 4; also figure out async
        this.props.socket.emit('gameStart');
        this.setState({ play: false})
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
    this.props.socket.emit('progress', {
      username: this.props.username,
      progress: this.props.progress
    });
    
    if (this.props.currentLetter === this.props.prompt.length) {
      this.props.socket.emit('gameOver', this.props.username);
      console.log('done');
    }
  }

  // change num below to 4

  render() {
    return (
        <div onClick={this.props.getGameFocus} className="game">
        <div id="progress" className="progress">
          {this.props.usersListStats.map((stat, i) => {
            return <Progress key={i} user={stat.username} progress={stat.progress} />
          })}
        </div>
        <div className="typingbox">
          {this.props.usersListStats.length < 2 && this.state.play === false ? <button onClick={this.onJoinGameClick}>Join Game!</button> : null}
          <TypingBox />
        </div>
        <div>
        {this.props.usersListStats.length < 2 && this.state.play === true ? <button onClick={this.onJoinGameClick}>Play Again!</button> : null}
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
    usersListStats: state.usersListStats
  }
}

export default connect(mapStateToProps, {
  changeView,
  getPrompt,
  getCurrentLetter,
  updateProgress,
  getUsersListStats
})(Game);