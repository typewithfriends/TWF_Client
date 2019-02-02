export const updateProgessReducer = (progress = 0, action) => {
  if (action.type === 'UPDATE_PROGRESS') {
    return action.payload;
  }
  return progress;
}
