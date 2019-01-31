import React from 'react';

import Game from '../Game/Game.jsx';
import Chat from '../Chat/Chat.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getKey: null
    }

    this.getKeyFn = this.getKeyFn.bind(this);
    this.getGameFocus = this.getGameFocus.bind(this);
    this.getChatFocus = this.getChatFocus.bind(this);
  }

  getKeyFn(fn) {
    this.setState({ getKey: fn });
  }

  getGameFocus() {
    console.log('game focused')
    window.addEventListener("keydown", this.state.getKey);
  }

  getChatFocus() {
    console.log('chat focused')
    window.removeEventListener('keydown', this.state.getKey)
  }

  render() {
    return (
      <div>
        <div className="flex-col">
          <h1>Type with Friends</h1>
          <div className="flex-row space-around">
            <Game getKeyFn={this.getKeyFn} getGameFocus={this.getGameFocus} />
            <Chat getChatFocus={this.getChatFocus} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;