import React from 'react';

{/* <div className="typingbox">
          <div className="prompt" dangerouslySetInnerHTML={{__html: 
          this.props.prompt.split('')
          .filter(e => e !== '\\')
          .map(e => {
            if (e === ' ') {
              return e = '&nbsp;';
            } else {
              return e;
            }
          })
          .map((e, i, a) => {
            if (!i) {
              return `<div class="wordcontainer">
          <span name="${i + 1}" class="letter">&nbsp;${e}</span>
          `;
            }
            if (i === a.length - 1) {
              return `  <span name="${i + 1}" class="letter">${e}</span>
          </div>`
            }
            if (e === '&nbsp;') {
              return `</div>
          <wbr>
          <div class="wordcontainer">
            <span name="${i + 1}" class="letter">${e}</span>
          `;
            } else {
              return `  <span name="${i + 1}" class="letter">${e}</span>
          `;
            }
          })
          .join('')}
          }>
          </div> */}