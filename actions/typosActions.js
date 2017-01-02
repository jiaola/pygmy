import TyposActionTypes from './TyposActionTypes'
import { API_ROOT, fetchHandler, addError } from './index'

export function requestTypos(char) {
  return dispatch => {
    var unicode = char.charCodeAt(0).toString(16)
    return fetch(`${API_ROOT}/characters/strokes/${unicode}`, {mode: 'cors'})
      .then(response => fetchHandler(response))
      .then(json => dispatch(receiveTyposResponse(char, json)))
      .catch(error => {
        dispatch(requestTyposFailed())
        dispatch(addError(TyposActionTypes.ADD_ERROR, error))
      })
  }
}

export function selectStroke(index) {
  return {
    type: TyposActionTypes.SELECT_STROKE,
    index
  }
}

export function sendTyposRequest() {
  return {
    type: TyposActionTypes.SEND_TYPOS_REQUEST,
    sendAt: Date.now()
  }
}

export function receiveTyposResponse(char, json) {
  return {
    type: TyposActionTypes.RECEIVE_TYPOS_RESPONSE,
    char,
    json,
    receivedAt: Date.now()
  }
}

export function deleteChars() {
  return {
    type: TyposActionTypes.DELETE_CHARS
  }
}

export function requestTyposFailed() {
  return {
    type: TyposActionTypes.REQUEST_TYPOS_FAILED
  }
}
