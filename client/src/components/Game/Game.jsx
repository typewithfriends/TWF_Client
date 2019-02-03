import './game.css';
import React from 'react';
import { connect } from 'react-redux';

import Progress from '../Progress/Progress.jsx';
<<<<<<< HEAD
import TypingBox from '../TypingBox/TypingBox.jsx';
=======
import { changeView } from '../../actions/changeView.js';
>>>>>>> Adds game logic socket code
import { getPrompt } from '../../actions/getPrompt.js'
import { getCurrentLetter } from '../../actions/getCurrentLetter.js'
import { updateProgress } from '../../actions/updateProgress.js'
import { getUsersListStats } from '../../actions/getUsersListStats.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.getKeyFn(this.getKey);

    this.props.socket.on('prompt', prompt => {
      prompt = prompt.quotes[0].quote;
      this.props.getPrompt(prompt);
    })
<<<<<<< HEAD
    
    this.props.socket.on('progress', (stats) => {
      // console.log(stats);
      this.props.getUsersListStats(stats);
=======

    this.props.socket.on('gameStartedAll', () => {
      setTimeout(this.startGame, 5000);
    });

    this.props.socket.on('gameOver', username => {
      console.log(username, 'won the game!');
      window.removeEventListener('keydown', this.state.getKey);
      this.props.changeView('gameRoom');
    })
  }

  onJoinGameClick = (e) => {
    this.props.socket.emit('joinGame', this.props.username);
    this.props.changeView('inGame');

    this.props.socket.emit('progress', {
      username: this.props.username,
      progress: this.props.progress
>>>>>>> Adds game logic socket code
    });
    console.log(this.props.usersListStats.length);

    if (this.props.usersListStats.length + 1 === 2) { // change this num to 4; also figure out async
      this.props.socket.emit('gameStart');
    }
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
<<<<<<< HEAD
        <div className="typingbox">
          <TypingBox />
=======
        <div className="typingbox"> 
          {this.props.usersListStats.length < 2 ? <button onClick={this.onJoinGameClick}>Join Game!</button> : null}
          <div className="prompt" dangerouslySetInnerHTML={{__html: 
          this.props.prompt.split('')
          .filter(e => e !== '\\' || e !== '[' || e !== ']')
          .map(e => {
            if (e === ' ') {
              return e = '&nbsp;';
            } else {
              return e;
            }
          })
          .map((e, i, a) => {
            if (!i) {
              return `<div class="wordcontainer">
          <span name="${i + 1}" key="${i + 1}" class="letter">&nbsp;${e}</span>
          `;
            }
            if (i === a.length - 1) {
              return `  <span name="${i + 1}" key="${i + 1}" class="letter">${e}</span>
          </div>`
            }
            if (e === '&nbsp;') {
              return `</div>
          <wbr>
          <div class="wordcontainer">
            <span name="${i + 1}" key="${i + 1}" class="letter">${e}</span>
          `;
            } else {
              return `  <span name="${i + 1}" key="${i + 1}" class="letter">${e}</span>
          `;
            }
          })
          .join('')}
          }>
          </div>
>>>>>>> Adds game logic socket code
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state)
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