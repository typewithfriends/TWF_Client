import React from 'react';
import { connect } from 'react-redux';

class TypingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
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