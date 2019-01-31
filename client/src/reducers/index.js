import { combineReducers } from 'redux';

const getPromptReducer = (prompt = '', action) => {
  if (action.type === 'GET_PROMPT') {
    return action.payload;
  }
  return prompt;
}

const getCurrentLetterReducer = (current = 0, action) => {
  if (action.type === 'GET_CURRENT_LETTER') {
    return action.payload;
  }
  return current;
}

const getProgessReducer = (progress = 0, action) => {
  if (action.type === 'GET_PROGRESS') {
    return action.payload;
  }
  return progress;
}

// const updateMessageReducer = (message = '', action) => {
//   if (action.type === 'UPDATE_MESSAGE') {
//     return action.payload;
//   }
//   return message;
// }

export default combineReducers({
  prompt: getPromptReducer,
  currentLetter: getCurrentLetterReducer,
  progress: getProgessReducer
});