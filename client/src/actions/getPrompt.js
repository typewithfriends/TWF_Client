export const getPrompt = prompt => {
  return {
    type: 'GET_PROMPT',
    payload: prompt
  }
}