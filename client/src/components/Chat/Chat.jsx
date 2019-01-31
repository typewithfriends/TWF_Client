import React from 'react';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.onMessageType = this.onMessageType.bind(this);
  }

  onMessageType(e) {
    if (e.key == 'Enter') {
      let message = e.target.value;
      console.log(message);
      e.target.value = '';
      // socket stuff here
      // send message to socket
      // socket.emit('msg', this.props.message); or something like this
    } 
  }

  render() {
    return (
      <div onClick={this.props.getChatFocus}>
        <div id="chatbox" className="chatbox"></div>
        <div>
          <input onKeyDown={this.onMessageType} placeholder="don't be anti-social..."></input>
        </div>
      </div>
    );
  }
}

export default Chat;