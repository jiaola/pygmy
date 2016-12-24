import fetch from 'isomorphic-fetch'
import * as ActionTypes from './actionTypes'
import { API_ROOT } from './index'

export function addChar(character) {
  return {
    type: ActionTypes.ADD_CHAR,
    character
  }
}

export function deleteChar(index) {
  return {
    type: ActionTypes.DELETE_CHAR,
    index
  }
}

export function setCharPinyin(index, pinyin) {
  return {
    type: ActionTypes.SET_CHAR_PINYIN,
    index: index,
    pinyin: pinyin
  }
}

export function setGridsPerRow(gridsPerRow) {
  return {
    type: ActionTypes.SET_GRIDS_PER_ROW,
    gridsPerRow
  }
}

export function setCharsPerRow(charsPerRow) {
  return {
    type: ActionTypes.SET_CHARS_PER_ROW,
    charsPerRow
  }
}

export function setFormat(format) {
  return {
    type: ActionTypes.SET_FORMAT,
    format
  }
}

export function setEmail(email) {
  return {
    type: ActionTypes.SET_EMAIL,
    email
  }
}

export function setPrintPinyin(printPinyin) {
  return {
    type: ActionTypes.SET_PRINT_PINYIN,
    printPinyin
  }
}

export function setPrintStrokes(printStrokes) {
  return {
    type: ActionTypes.SET_PRINT_STROKES,
    printStrokes
  }
}

export function requestPinyin(chars) {
  return {
    type: ActionTypes.REQUEST_PINYIN,
    chars
  }
}

export function receivePinyin(chars, json) {
  return {
    type: ActionTypes.RECEIVE_PINYIN,
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
    var query = chars.map((ch) => 'chars[]=' + ch.charCodeAt(0).toString(16)).join('&')
    return fetch(`${API_ROOT}/characters/pinyins?${query}`, {mode: 'cors'})
      .then(response => response.json())
      .then(json => dispatch(receivePinyin(chars, json)))
  }
}

export function submitGrid(options, chars) {
  return dispatch => {
    dispatch(sendGridRequest())
    var query = chars.map((ch) => 'chars[]=' + ch.get('unicode')).join('&')
    query += '&' + chars.map((ch) => 'pinyins[]=' + ch.get('pinyin')).join('&')
    query += '&email=' + options.get('email')
    query += '&grids_per_row=' + options.get('gridsPerRow')
    query += '&chars_per_row=' + options.get('charsPerRow')
    query += '&grid_format=' + options.get('gridFormat')
    query += '&print_pinyin=' + options.get('printPinyin')
    query += '&print_strokes=' + options.get('printStrokes')
    return fetch(`${API_ROOT}/grid/email_pdf?${query}`, {mode: 'cors'})
      .then(response => response.json())
      .then(json => dispatch(receiveGridResponse(json)))
  }
}

export function receiveGridResponse(json) {
  return {
    type: ActionTypes.RECEIVE_GRID_RESPONSE,
    json,
    receivedAt: Date.now()
  }
}

export function sendGridRequest() {
  return {
    type: ActionTypes.SEND_GRID_REQUEST,
    sentAt: Date.now()
  }
}
