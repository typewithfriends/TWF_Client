// export const getPrompt = () => {
//   return async (dispatch) => {
//     const prompt = await axios('https://opinionated-quotes-api.gigalixirapp.com//v1/quotes?rand=t&n=1')
//       .catch(err => console.error(err));

//     dispatch({type: 'GET_PROMPT', payload: prompt});
//   }
// }

export const getPrompt = prompt => {
  return {
    type: 'GET_PROMPT',
    payload: prompt
  }
}

export const getCurrentLetter = current => {
  return {
    type: 'GET_CURRENT_LETTER',
    payload: current
  }
}

export const getProgress = progress => {
  return {
    type: 'GET_PROGRESS',
    payload: progress
  }
}

export const updateMessage = message => {
  return {
    type: 'UPDATE_MESSAGE',
    payload: message
  }
}