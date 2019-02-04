import React from 'react';
// import './word.css';

const Word = props => (
  <div className="wordcontainer">
    <span className="letter">&nbsp;<div className="cursor"></div></span>
    {props.splitWord.map((letter, i) => {
    return (
      <span key={i} className="letter">{letter}<div className="cursor"></div></span>
    )
    })}
  </div>
)

export default Word;

