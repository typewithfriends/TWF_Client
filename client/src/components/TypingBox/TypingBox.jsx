import React from 'react';
import { connect } from 'react-redux';
import './typingbox.css';

import Word from './Word.jsx';

class TypingBox extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(p) {
    if (p.currentLetter !== this.props.currentLetter) {
      // DON'T
      document.querySelectorAll('.letter').forEach(el => el.children[0].classList.remove('shown'));
      // QUESTION THIS
      for (let i = 0; i < 1000; i += 1) {
        window.clearInterval(i);
      }
      this.cursor();
      document.querySelectorAll('.letter')[this.props.currentLetter].classList.add('done');
    }
  }

  cursor() {
    // or will return undefined
    if (this.props.currentLetter + 2 < this.props.prompt.length) {
      document.querySelectorAll('.letter')[this.props.currentLetter + 1].children[0].classList.toggle('shown');
      window.setInterval(() => {
        document.querySelectorAll('.letter')[this.props.currentLetter + 1].children[0].classList.toggle('shown');
      }, 400);
    }
  }


  render() {
    const prompt = this.props.prompt
      .split('')
      .filter(e => e !== '\\')
      .join('')
      .split(' ');

    return (
      <div className="prompt">
        {prompt.map((word, i) => 
        <Word 
          key={i} 
          splitWord={word.split('')}
        />)}
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