// export const getPrompt = () => {
//   return async (dispatch) => {
//     const prompt = await axios('https://opinionated-quotes-api.gigalixirapp.com//v1/quotes?rand=t&n=1')
//       .catch(err => console.error(err));

//     dispatch({type: 'GET_PROMPT', payload: prompt});
//   }
// }

export const changeView = view => {
  return {
    type: 'CHANGE_VIEW',
    payload: view
  }
}

export const getUsername = username => {
  return {
    type: 'GET_USERNAME',
    payload: username
  }
}

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

export const updateProgress = progress => {
  return {
    type: 'UPDATE_PROGRESS',
    payload: progress
  }
}

// export const updateMessage = message => {
//   return {
//     type: 'UPDATE_MESSAGE',
//     payload: message
//   }
// }