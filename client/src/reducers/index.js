import { combineReducers } from 'redux';

import { changeViewReducer } from './changeViewReducer.js';
import { getUsernameReducer } from './getUsernameReducer.js';
import { getPromptReducer } from './getPromptReducer.js';
import { getCurrentLetterReducer } from './getCurrentLetterReducer.js';
import { updateProgessReducer } from './updateProgressReducer.js';
import { getUsersListStatsReducer } from './getUsersListStatsReducer.js';
import { checkGameStatusReducer } from './checkGameStatusReducer.js';


export default combineReducers({
  view: changeViewReducer,
  username: getUsernameReducer,
  prompt: getPromptReducer,
  currentLetter: getCurrentLetterReducer,
  progress: updateProgessReducer,
  usersListStats: getUsersListStatsReducer,
  gameStatus: checkGameStatusReducer
});