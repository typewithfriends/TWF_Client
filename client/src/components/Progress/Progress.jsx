import React from 'react';
import './progress.css';

class Progress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="progressbarcontainer">
        <div className="progressuserinfo">{this.props.user}</div>
        <div className="progressbar"></div>
        <div style={{'width': `${this.props.progress * 618 + 2}px`}} className="progressbarprogress"></div>
      </div>
    );
  }
}


export default Progress;