export const getUsersListStatsReducer = (usersList = [], action) => {
  if (action.type === 'GET_USERS_LIST_STATS') {
    return action.payload;
  }
  return usersList;
}