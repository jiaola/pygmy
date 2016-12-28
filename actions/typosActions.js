import TyposActionTypes from './TyposActionTypes'

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
