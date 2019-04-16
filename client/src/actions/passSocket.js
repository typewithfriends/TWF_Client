export const passSocket = socket => {
  return {
    type: 'PASS_SOCKET',
    payload: socket
  }
}
