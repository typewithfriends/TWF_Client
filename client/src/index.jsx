import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import Root from './components/Root.jsx';
import reducers from './reducers/index.js';


ReactDOM.render(<Root store={ createStore(reducers) } />, document.getElementById('root'));
