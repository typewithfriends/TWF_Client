export const checkLoginStatusReducer = (loggedIn = false, action) => {
  if (action.type === 'CHECK_LOGIN_STATUS') {
    return action.payload;
  }
  return loggedIn;
}
