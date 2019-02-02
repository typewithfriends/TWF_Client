export const getPromptReducer = (prompt = '', action) => {
  if (action.type === 'GET_PROMPT') {
    return action.payload;
  }
  return prompt;
}
