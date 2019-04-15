export const getGameWpm = wpm => {
  return {
    type: 'GET_GAME_WPM',
    payload: wpm
  }
}