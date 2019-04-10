export const passSocketReducer = (socket = null, action) => {
  if (action.type === 'PASS_SOCKET') {
    return action.payload;
  }
  return socket;
}
