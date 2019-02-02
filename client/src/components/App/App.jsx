import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import TopBar from '../Top Bar/TopBar.jsx';
import Game from '../Game/Game.jsx';
import Chat from '../Chat/Chat.jsx';
import Splash from '../Splash/Splash.jsx';
import { changeView } from '../../actions/index.js';

const port = 3000;
const socket = io(`http://localhost:${port}`);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getKey: null,
      socket: socket
    }

    this.getKeyFn = this.getKeyFn.bind(this);
    this.getGameFocus = this.getGameFocus.bind(this);
    this.getChatFocus = this.getChatFocus.bind(this);
  }

  componentDidMount() {
    this.state.socket.emit('joinRoom', 'lobby');
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
    window.removeEventListener('keydown', this.state.getKey);
  }

  render() {
    return (
      // <div>
      //   <div className="flex-col">
      //     <h1>Type with Friends</h1>
      //     <div>
      //       {
      //         this.props.view === 'splash' ? <Splash /> : 
      //         <div className="flex-row space-around">
      //           <Game
      //             getKeyFn={this.getKeyFn}
      //             getGameFocus={this.getGameFocus}
      //             socket={this.state.socket}
      //           />
      //           <Chat
      //             getChatFocus={this.getChatFocus}
      //             socket={this.state.socket}
      //           />
      //         </div>
      //       }
      //     </div>
      //   </div>
      // </div>
      <div>
        <TopBar />
        <div className="mainapp">
          <Game
            getKeyFn={this.getKeyFn}
            getGameFocus={this.getGameFocus}
            socket={this.state.socket}
          />
          <Chat
            getChatFocus={this.getChatFocus}
            socket={this.state.socket}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps, {
  changeView
})(App);