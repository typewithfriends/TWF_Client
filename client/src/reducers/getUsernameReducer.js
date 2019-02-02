export const getUsernameReducer = (username = '', action) => {
  if (action.type === 'GET_USERNAME') {
    return action.payload;
  }
  return username;
}
