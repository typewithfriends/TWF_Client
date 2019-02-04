import React from 'react';
import { connect } from 'react-redux';
import './typingbox.css';

class TypingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0
    }
  }

  componentDidMount() {
    this.setState({ length: this.props.prompt.legth });
  }

  render() {
    return (
      <div className="promptcontainer">
        <span className="prompt">
          <span className="type done">{this.props.prompt.slice(0, this.props.currentLetter)}</span>
          <span className="type cursor">|</span>
          <span className="type">{this.props.prompt.slice(this.props.currentLetter, this.state.length)}</span>
        </span>
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