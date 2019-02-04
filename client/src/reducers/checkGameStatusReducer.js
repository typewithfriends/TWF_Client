export const checkGameStatusReducer = (gameStatus = false, action) => {
  if (action.type === 'CHECK_GAME_STATUS') {
    return action.payload;
  }
  return gameStatus;
}