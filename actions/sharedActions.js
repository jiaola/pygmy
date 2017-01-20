import { API_ROOT } from './index'

import WriterActionTypes from './WriterActionTypes'

export function requestChar(char, requestType, responseType, failureType, errorType) {
  return dispatch => {
    dispatch(sendCharRequest(requestType))
    let unicode = char.charCodeAt(0).toString(16)
    let requestUrl
    if (requestType === WriterActionTypes.SEND_CHAR_REQUEST) {
      requestUrl = `${API_ROOT}/big5/${unicode}`
    } else {
      requestUrl = `${API_ROOT}/characters/${unicode}`
    }
    return fetch(requestUrl, {mode: 'cors'})
      .then(response => fetchHandler(response))
      .then(json => dispatch(receiveCharResponse(responseType, char, json)))
      .catch(error => {
        dispatch(requestCharFailed(failureType))
        dispatch(addError(errorType, error))
      })
  }
}

export function sendCharRequest(type) {
  return {
    type,
    sendAt: Date.now()
  }
}


export function requestCharFailed(type) {
  return {
    type
  }
}

export function receiveCharResponse(type, char, json) {
  return {
    type,
    char,
    json,
    receivedAt: Date.now()
  }
}

export function fetchHandler(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response.json()
}

export function addError(type, error) {
  return {
    type: type,
    error
  }
}

export function deleteError(type, index) {
  return {
    type,
    index
  }
}

export function deleteErrors(type) {
  return {
    type
  }
}

export function deleteMessages(type) {
  return {
    type
  }
}
