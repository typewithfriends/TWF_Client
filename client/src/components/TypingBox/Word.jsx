import React from 'react';

const Word = props => (
    <div className="wordcontainer">
      <span className="letter">&nbsp;</span>
      {props.splitWord.map((letter, i) => <span key={props.wordNum * 100 + i} className="letter">{letter}</span>)}
    </div>
)

export default Word;