export const checkLoginStatus = loggedIn => {
  return {
    type: 'CHECK_LOGIN_STATUS',
    payload: loggedIn
  }
}