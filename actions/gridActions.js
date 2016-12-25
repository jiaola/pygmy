import fetch from 'isomorphic-fetch'
import * as ActionTypes from './actionTypes'
import { API_ROOT } from './index'
import * as Utils from '../utils/Utils'

let fetchHandler = response => {
  if (!response.ok) throw Error(response.statusText)
  return response.json()
}

export function addChars(chars) {
  return dispatch => {
    dispatch(requestPinyin(chars))
    var query = chars.map((ch) => 'chars[]=' + Utils.charToHex(ch)).join('&')
    return fetch(`${API_ROOT}/characters/pinyins?${query}`, {mode: 'cors'})
      .then(response => fetchHandler(response))
      .then(json => dispatch(receivePinyin(json)))
      .catch(error => dispatch(requestPinyinFailed(error)))
  }
  return {
    type: ActionTypes.ADD_CHARS,
    chars
  }
}

export function deleteChars() {
  return {
    type: ActionTypes.DELETE_CHARS
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

export function receivePinyin(json) {
  console.log('receivePinyin', json)
  return {
    type: ActionTypes.RECEIVE_PINYIN,
    chars: json,
    receivedAt: Date.now()
  }
}

export function requestPinyinFailed(error) {
  return {
    type: ActionTypes.REQUEST_PINYIN_FAILED,
    error
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

}

export function submitGrid(grids) {
  var chars = grids.get('chars')
  return dispatch => {
    dispatch(sendGridRequest())
    var query = chars.map((ch) => 'chars[]=' + ch.get('character')).join('&')
    query += '&' + chars.map((ch) => 'pinyins[]=' + ch.get('selectedPinyin')).join('&')
    query += '&email=' + grids.get('email')
    query += '&grids_per_row=' + grids.get('gridsPerRow')
    query += '&chars_per_row=' + grids.get('charsPerRow')
    query += '&grid_format=' + grids.get('gridFormat')
    query += '&print_pinyin=' + grids.get('printPinyin')
    query += '&print_strokes=' + grids.get('printStrokes')
    return fetch(`${API_ROOT}/grid/email_pdf?${query}`, {mode: 'cors'})
      .catch(error => console.log(error))
      .then(response => {
        console.log('response', response)
        if (!response.ok) throw Error(response.statusText)
        return response
      }).then(response => response.json())
      .then(json => dispatch(receiveGridResponse(json)))
      .catch(error => console.log(error))
  }
}

export function resetGrid() {
  console.log('reset grid')
  return {
    type: ActionTypes.RESET_GRID
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
