import fetch from 'isomorphic-fetch'
import * as ActionTypes from './actionTypes'
import { API_ROOT } from './index'

export function sendStrokesRequest() {
  return {
    type: ActionTypes.SEND_STROKES_REQUEST,
    sendAt: Date.now()
  }
}

export function receiveStrokesResponse(char, json) {
  return {
    type: ActionTypes.RECEIVE_STROKES_RESPONSE,
    char,
    json,
    receivedAt: Date.now()
  }
}

export function requestStrokes(char, response) {
  return dispatch => {
    dispatch(sendStrokesRequest())
    var unicode = char.charCodeAt(0).toString(16)
    return fetch(`${API_ROOT}/characters/strokes/${unicode}`, {mode: 'cors'})
      .then(response => response.json())
      .then(json => dispatch(response(char, json)))
  }
}
