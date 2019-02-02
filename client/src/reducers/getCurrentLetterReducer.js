export const getCurrentLetterReducer = (currentLetter = 0, action) => {
  if (action.type === 'GET_CURRENT_LETTER') {
    return action.payload;
  }
  return currentLetter;
}
