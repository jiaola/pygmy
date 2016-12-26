import * as ActionTypes from './actionTypes'

export function hideStroke(index) {
  return {
    type: ActionTypes.HIDE_STROKE,
    index
  }
}

export function showStroke(index) {
  return {
    type: ActionTypes.SHOW_STROKE,
    index
  }
}

export function receiveTyposResponse(char, json) {
  return {
    type: ActionTypes.RECEIVE_TYPOS_RESPONSE,
    char,
    json,
    receivedAt: Date.now()
  }
}
