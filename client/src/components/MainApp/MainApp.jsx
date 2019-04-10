import React from 'react';

import Game from '../Game/Game.jsx';
import Chat from '../Chat/Chat.jsx';
import './mainapp.css';

const MainApp = props => {
  return (
    <div className="mainapp">
      <Game socket={props.socket} />
      <Chat socket={props.socket} />
    </div>
  );
}

export default MainApp;