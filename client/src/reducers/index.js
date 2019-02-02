import { combineReducers } from 'redux';

const changeViewReducer = (view = 'splash', action) => {
  if (action.type === 'CHANGE_VIEW') {
    return action.payload;
  }
  return view;
}

const getUsernameReducer = (username = '', action) => {
  if (action.type === 'GET_USERNAME') {
    return action.payload;
  }
  return username;
}

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

const updateProgessReducer = (progress = 0, action) => {
  if (action.type === 'UPDATE_PROGRESS') {
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
  view: changeViewReducer,
  username: getUsernameReducer,
  prompt: getPromptReducer,
  currentLetter: getCurrentLetterReducer,
  progress: updateProgessReducer
});