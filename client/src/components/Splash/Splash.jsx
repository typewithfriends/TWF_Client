import React from 'react';
import { connect } from 'react-redux';

import { changeView, getUsername } from '../../actions/index.js';

class Splash extends React.Component {
  constructor(props) {
    super(props);

    this.getUsername = this.getUsername.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
  }

  getUsername(e) {
    this.props.getUsername(e.target.value);
  }

  enterUsername(e) {
    this.props.changeView('game');
  }

  render() {
    return (
      <div>
        <p>What is your name?</p>
        <input onChange={this.getUsername} className="username"></input>
        <button onClick={this.enterUsername}>Let's Play!</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username
  }
}

export default connect(mapStateToProps, {
  changeView,
  getUsername
})(Splash);

// 