export const checkGameStatus = gameStatus => {
  return {
    type: 'CHECK_GAME_STATUS',
    payload: gameStatus
  }
}