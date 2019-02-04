import React from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';
import './progress.css';
=======
>>>>>>> Refactors game logic to server side

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