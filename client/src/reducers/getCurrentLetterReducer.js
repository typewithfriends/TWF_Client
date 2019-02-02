export const getCurrentLetterReducer = (current = 0, action) => {
  if (action.type === 'GET_CURRENT_LETTER') {
    return action.payload;
  }
  return current;
}
