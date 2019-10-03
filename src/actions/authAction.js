import { CONSTANTS } from '../actions'

export const loginUser = (username) => {
  return dispatch => {
    return dispatch({
      type: CONSTANTS.LOG_IN,
      username,
    })
  }
}
