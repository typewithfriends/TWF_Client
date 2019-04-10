import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './chat.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let feedback = document.getElementById('feedback');
    let output = document.getElementById('output');

    // gets all previous messages and adds them to the chat
    this.props.socket.emit('getallmessages');
    this.props.socket.on('getallmessages', (messages) => {
      for (let msg of messages) {
        output.innerHTML += '<p><strong>' + msg.handle + ': </strong>' + msg.message + '</p>';
      }
    })

    // adds each new message to chat
    this.props.socket.on('chat', (message) => {
      feedback.innerHTML = '';
      output.innerHTML += '<p><strong>' + message.handle + ': </strong>' + message.message + '</p>';
      output.scrollTop = output.scrollHeight;
    });

    this.props.socket.on('typing', data => {
      feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
    });

    this.props.socket.on('notyping', () => {
      feedback.innerHTML = '';
    })
  }

  onMessageType = (e) => {
    let handle = this.props.username;
    if (e.key === 'Enter') {
      let message = e.target.value;
      
      this.props.socket.emit('chat', {
        message,
        handle
      });

      e.target.value = '';
    } else {
      if (e.target.value !== '') {
        this.props.socket.emit('typing', handle);
      } else {
        this.props.socket.emit('notyping');
      }
    }
  }

  render() {
    return (
      <div className="chat">
        <div id="output" className="chatbox">
          <div id="feedback"></div>
        </div>
        <div>
          <input id="chatInput" className="chatinput" onKeyDown={this.onMessageType} placeholder="don't be anti-social..."></input>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    // socket: state.socket
  }
}

export default connect(mapStateToProps)(Chat);

Chat.propTypes = {
  username: PropTypes.string.isRequired,
  // socket: PropTypes.object.isRequired
}