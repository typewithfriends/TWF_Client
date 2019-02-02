import './game.css';
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getPrompt, getCurrentLetter, updateProgress } from '../../actions/index.js';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.getKey = this.getKey.bind(this);
  }

  componentDidMount() {
    axios.get('/api/prompt')
      .then(({ data }) => {
        data = data.quotes[0].quote;
        this.props.getPrompt(data);
      })
      .catch(err => console.error(err, 'unable to get prompt'));

    this.props.getKeyFn(this.getKey);
  }

  getKey(e) {
    if (e.key === this.props.prompt[this.props.currentLetter]) {
      let updatedProgress = (this.props.currentLetter + 1) / this.props.prompt.length;
      this.props.getCurrentLetter(this.props.currentLetter + 1);
      this.props.updateProgress(updatedProgress);
    }
    if (this.props.currentLetter === this.props.prompt.length) {
      console.log('done');
      // maybe emit winner here
    }
  }

  
  render() {
    return (
      <div onClick={this.props.getGameFocus} className="game">
        <div id="progress" className="progress"></div>
        <div className="typingbox">
          <div className="prompt" dangerouslySetInnerHTML={{__html: 
          this.props.prompt.split('')
          .filter(e => e !== '\\')
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
          <span name="${i + 1}" class="letter">&nbsp;${e}</span>
          `;
            }
            if (i === a.length - 1) {
              return `  <span name="${i + 1}" class="letter">${e}</span>
          </div>`
            }
            if (e === '&nbsp;') {
              return `</div>
          <wbr>
          <div class="wordcontainer">
            <span name="${i + 1}" class="letter">${e}</span>
          `;
            } else {
              return `  <span name="${i + 1}" class="letter">${e}</span>
          `;
            }
          })
          .join('')}
          }>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    prompt: state.prompt,
    currentLetter: state.currentLetter,
    progress: state.progress
  }
}

export default connect(mapStateToProps, {
  getPrompt,
  getCurrentLetter,
  updateProgress
})(Game);

// 