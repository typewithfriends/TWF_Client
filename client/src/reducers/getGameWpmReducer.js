export const getGameWpmReducer = (wpm = 0, action) => {
  if (action.type === 'GET_GAME_WPM') {
    return action.payload;
  }
  return wpm;
}