import * as ActionTypes from './actionTypes'

export function selectStroke(index) {
  return {
    type: ActionTypes.SELECT_STROKE,
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
