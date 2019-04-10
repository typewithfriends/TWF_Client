import React from 'react';
import { connect } from 'react-redux';
import './typingbox.css';

const TypingBox = ({ prompt, currentLetter }) => {
  return (
    <div className="promptcontainer">
      <span className="prompt">
        <span className="type done">{prompt.slice(0, currentLetter)}</span>
        <span className="type cursor">|</span>
        <span className="type">{prompt.slice(currentLetter)}</span>
      </span>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    prompt: state.prompt,
    currentLetter: state.currentLetter
  }
}

export default connect(mapStateToProps)(TypingBox);