import './game.css';
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Progress from '../Progress/Progress.jsx';
import TypingBox from '../TypingBox/TypingBox.jsx';
import { getPrompt } from '../../actions/getPrompt.js'
import { getCurrentLetter } from '../../actions/getCurrentLetter.js'
import { updateProgress } from '../../actions/updateProgress.js'
import { getUsersListStats } from '../../actions/getUsersListStats.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getKeyFn(this.getKey);

    this.props.socket.emit('prompt');

    this.props.socket.on('prompt', prompt => {
      prompt = prompt.quotes[0].quote;
      this.props.getPrompt(prompt);
    })
    
    this.props.socket.on('progress', (stats) => {
      // console.log(stats);
      this.props.getUsersListStats(stats);
    });
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
      console.log('done');
      // maybe emit winner here
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
          <TypingBox />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state)
  return {
    prompt: state.prompt,
    currentLetter: state.currentLetter,
    username: state.username,
    progress: state.progress,
    usersListStats: state.usersListStats
  }
}

export default connect(mapStateToProps, {
  getPrompt,
  getCurrentLetter,
  updateProgress,
  getUsersListStats
})(Game);