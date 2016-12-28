import fetch from 'isomorphic-fetch'
import StrokesActionTypes from './StrokesActionTypes'
import { API_ROOT, fetchHandler } from './index'

export function requestStrokes(char, responseAction, errorAction) {
  return dispatch => {
    var unicode = char.charCodeAt(0).toString(16)
    return fetch(`${API_ROOT}/characters/strokes/${unicode}`, {mode: 'cors'})
      .then(response => fetchHandler(response))
      .then(json => dispatch(responseAction(char, json)))
      .catch(error => dispatch(requestStrokesFailed(error)))
  }
}

export function sendStrokesRequest() {
  return {
    type: StrokesActionTypes.SEND_STROKES_REQUEST,
    sendAt: Date.now()
  }
}

export function receiveStrokesResponse(char, json) {
  console.log('RECEIVE_STROKES_RESPONSE', char, json);
  return {
    type: StrokesActionTypes.RECEIVE_STROKES_RESPONSE,
    char,
    json,
    receivedAt: Date.now()
  }
}

export function deleteChars() {
  return {
    type: StrokesActionTypes.DELETE_CHARS
  }
}
