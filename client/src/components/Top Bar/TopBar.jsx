import React from 'react';
import './topbar.css';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="topbar">
      <div className="logo">Type With Friends</div>
      <div className="buttoncontainer">
        {/* <div className="button">Stats</div> */}
        {/* conditionally rendered based on login ^^ */}
        <div className="button">Log In</div>
        {/* conditionally rendered based on login status */}
        {/* <div className="button">Log Out</div> */}
        {/* conditionally rendered based on login status (you can just do in the text box {this.state.loggedIn ? Log out : Log In}) */}
        <div className="button">Sign Up</div>
        {/* conditionally rendered based on login status */}
      </div>
    </div>
    )
  }
}

// 