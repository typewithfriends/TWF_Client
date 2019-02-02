export const changeViewReducer = (view = 'splash', action) => {
  if (action.type === 'CHANGE_VIEW') {
    return action.payload;
  }
  return view;
}
