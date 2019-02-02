import { combineReducers } from 'redux';

import { changeViewReducer } from './changeViewReducer.js';
import { getUsernameReducer } from './getUsernameReducer.js';
import { getPromptReducer } from './getPromptReducer.js';
import { getCurrentLetterReducer } from './getCurrentLetterReducer.js';
import { updateProgessReducer } from './updateProgressReducer.js';


export default combineReducers({
  view: changeViewReducer,
  username: getUsernameReducer,
  prompt: getPromptReducer,
  currentLetter: getCurrentLetterReducer,
  progress: updateProgessReducer
});