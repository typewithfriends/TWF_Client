import React from 'react';
import { connect } from 'react-redux';
import { getPrompt, getCurrentLetter, getProgress } from '../../actions/index.js';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.getKey = this.getKey.bind(this);
  }

  componentDidMount() {
    let myPrompt = 'hello tommy liao' // this needs to listen from the socket
    this.props.getPrompt(myPrompt);

    this.props.getKeyFn(this.getKey);
  }

  getKey(e) {
    if (e.key === this.props.prompt[this.props.currentLetter]) {
      let updatedProgress = (this.props.currentLetter + 1) / this.props.prompt.length;
      this.props.getCurrentLetter(this.props.currentLetter + 1);
      this.props.getProgress(updatedProgress);
    }
    if (this.props.currentLetter === this.props.prompt.length) {
      console.log('done');
      // maybe emit winner here
    }
  }

  render() {
    return (
      <div onClick={this.props.getGameFocus} className="flex-col space-between">
        <div id="progress" className="progress"></div>
        <div id="text" className="text"></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state', state)
  return {
    prompt: state.prompt,
    currentLetter: state.currentLetter,
    progress: state.progress
  }
}

export default connect(mapStateToProps, {
  getPrompt,
  getCurrentLetter,
  getProgress
})(Game);