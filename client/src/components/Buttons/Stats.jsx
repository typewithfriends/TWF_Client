import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gamesPlayed: 0,
      fastestWpm: 0,
      averageWpm: 0
    }
  }

  componentDidMount() {
    this.getStats();
  }
  
  getStats = () => {
    axios.get(`http://localhost:3000/api/users/stats/${this.props.username}`)
      .then(({ data }) => {
        let { gamesPlayed, fastestWpm, averageWpm } = data;
        fastestWpm = fastestWpm.toFixed(2);
        averageWpm = averageWpm.toFixed(2);
        this.setState({
          gamesPlayed,
          fastestWpm,
          averageWpm
        })
      })
      .catch(err => console.error('error getting stats page to load', err));
  }

  render() {
    return (
      <div className="statsmodal">
        <div><b>{this.props.username}'s statistics:</b></div>
        <div>Number of games played: {this.state.gamesPlayed}</div>
        <div>Fastest WPM: {this.state.fastestWpm} WPM</div>
        <div>Average WPM: {this.state.averageWpm} WPM</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.username
  }
}

export default connect(mapStateToProps)(Stats);

Stats.propTypes = {
  username: PropTypes.string.isRequired
}