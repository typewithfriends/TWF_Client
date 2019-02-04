import React from 'react';
import { connect } from 'react-redux';
import './chat.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let feedback = document.getElementById('feedback');
    let output = document.getElementById('output');

    this.props.socket.on('chat', ({ handle, message }) => {
      feedback.innerHTML = '';
      output.innerHTML += '<p><strong>' + handle + ': </strong>' + message + '</p>';
      output.scrollTop = output.scrollHeight;
    });

    this.props.socket.on('typing', data => {
      feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
    });
  
  }

  onMessageType = (e) => {
    let handle = this.props.username;
    if (e.key == 'Enter') {
      let message = e.target.value;
      
      this.props.socket.emit('chat', {
        message: message,
        handle: handle
      });

      e.target.value = '';
    } else {
      this.props.socket.emit('typing', handle);
    }
  }

  render() {
    return (
      <div onClick={this.props.getChatFocus} className="chat">
        <div id="output" className="chatbox"></div>
          <div id="feedback"></div>
        <div>
          <input className="chatinput" onKeyDown={this.onMessageType} placeholder="don't be anti-social..."></input>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username
  }
}

export default connect(mapStateToProps)(Chat);