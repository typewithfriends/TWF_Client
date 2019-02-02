import React from 'react';
import { connect } from 'react-redux';

class Progress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="progressbarcontainer">
        <div className="progressuserinfo">{this.props.user}</div>
        <div className="progressbar"></div>
        <div style={{'width': `${this.props.progress * 618}px`}} className="progressbarprogress"></div>
      </div>
    );
  }
}


export default Progress;