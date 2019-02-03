import React from 'react';
import { connect } from 'react-redux';

import Word from './Word.jsx';

class TypingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // componentDidUpdate() {
  //   if (this.props.prompt.length >= this.props.currentLetter) {
  //     console.log(this.props.currentLetter);
  //     setInterval(() => {
  //       document.getElementsByName(this.props.currentLetter)[0].classList.toggle('current');
  //     }, 400);
  //   }
  // }

  render() {
    const prompt = this.props.prompt
      .split('')
      .filter(e => e !== '\\' && e !== '[' && e !== ']')
      .join('')
      .split(' ');

    return (
      <div className="prompt">
        {prompt.map((word, i) => <Word key={i} wordNum={i} splitWord={word.split('')}/>)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    prompt: state.prompt,
    currentLetter: state.currentLetter
  }
}

export default connect(mapStateToProps)(TypingBox);