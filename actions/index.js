import fetch from 'isomorphic-fetch'

export const ADD_CHAR = 'ADD_CHAR'
export function addChar(character) {
  return {
    type: ADD_CHAR,
    character
  }
}

export const DELETE_CHAR = 'DELETE_CHAR'
export function deleteChar(index) {
  return {
    type: DELETE_CHAR,
    index
  }
}

export const SET_CHAR_PINYIN = 'SET_CHAR_PINYIN'
export function setCharPinyin(index, pinyin) {
  return {
    type: SET_CHAR_PINYIN,
    index: index,
    pinyin: pinyin
  }
}

export const SET_GRIDS_PER_ROW = 'SET_GRIDS_PER_ROW'
export function setGridsPerRow(grids_per_row) {
  return {
    type: SET_GRIDS_PER_ROW,
    grids_per_row
  }
}

export const SET_CHARS_PER_ROW = 'SET_CHARS_PER_ROW'
export function setCharsPerRow(chars_per_row) {
  return {
    type: SET_CHARS_PER_ROW,
    chars_per_row
  }
}

export const SET_FORMAT = 'SET_FORMAT'
export function setFormat(format) {
  return {
    type: SET_FORMAT,
    format
  }
}

export const SET_EMAIL = 'SET_EMAIL'
export function setEmail(email) {
  return {
    type: SET_EMAIL,
    email
  }
}

export const SET_PINYIN = 'SET_PINYIN'
export function setPinyin(pinyin) {
  return {
    type: SET_PINYIN,
    pinyin
  }
}

export const SET_STROKES = 'SET_STROKES'
export function setStrokes(strokes) {
  return {
    type: SET_STROKES,
    strokes
  }
}

export const REQUEST_PINYIN = 'REQUEST_PINYIN'
export function requestPinyin(chars) {
  return {
    type: REQUEST_PINYIN,
    chars
  }
}

export const RECEIVE_PINYIN = 'RECEIVE_PINYIN'
export function receivePinyin(chars, json) {
  return {
    type: RECEIVE_PINYIN,
    chars,
    pinyin: json,
    receivedAt: Date.now()
  }
}

// export const PINYIN_REQUEST = 'PINYIN_REQUEST'
// export const PINYIN_SUCCESS = 'PINYIN_SUCCESS'
// export const PINYIN_FAILURE = 'PINYIN_FAILURE'
//
// // function fetchPinyin(chars) {
// //   return {
// //     [CALL_API]: {
// //       types: [PINYIN_REQUEST, PINYIN_SUCCESS, PINYIN_FAILURE],
// //       endpoint: 'characters/pinyins?chars[]=3401&chars[]=3406&chars[]=3416'
// //     }
// //   }
// // }
//

export function fetchPinyin(chars) {
  return dispatch => {
    dispatch(requestPinyin(chars))
    //var apiRoot = 'http://pygmy.brickowls.com/'
    var apiRoot = 'http://localhost:3000/'
    var query = chars.map((ch) => 'chars[]=' + ch.charCodeAt(0).toString(16)).join('&')
    return fetch(`${apiRoot}characters/pinyins?${query}`, {mode: 'cors'})
      .then(response => response.json())
      .then(json => dispatch(receivePinyin(chars, json)))
  }
}

export const REQUEST_STROKES = 'REQUEST_STROKES'
export const RECEIVE_STROKES = 'RECEIVE_STROKES'

export const SUBMIT_GRID = 'SUBMIT_GRID'
export function submitGrid(chars, email, grids_per_row, chars_per_row) {
  return dispatch => {
    dispatch(sendGridRequest())
    //var apiRoot = 'http://pygmy.brickowls.com/'
    var apiRoot = 'http://localhost:3000/'
    var query = chars.map((ch) => 'chars[]=' + ch.get('unicode')).join('&')
    query += '&email=' + email + '&grids_per_row=' + grids_per_row + '&chars_per_row=' + chars_per_row
    return fetch(`${apiRoot}grid/email_pdf?${query}`, {mode: 'cors'})
      .then(response => response.json())
      .then(json => dispatch(receiveGridResponse(json)))
  }
}

export const RECEIVE_GRID_RESPONSE = 'RECEIVE_GRID_RESPONSE'
export function receiveGridResponse(json) {
  return {
    type: RECEIVE_GRID_RESPONSE,
    json,
    receivedAt: Date.now()
  }
}

export const SEND_GRID_REQUEST = 'SEND_GRID_REQUEST'
export function sendGridRequest() {
  return {
    type: SEND_GRID_REQUEST,
    sentAt: Date.now()
  }
}
