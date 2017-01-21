import fetch from 'isomorphic-fetch'
import GridActionTypes from './GridActionTypes'
import { API_ROOT } from './index'
import { fetchHandler, addError } from './sharedActions'
import * as Utils from '../utils/Utils'

// Forms
export function setGridsPerRow(gridsPerRow) {
  return {
    type: GridActionTypes.SET_GRIDS_PER_ROW,
    gridsPerRow
  }
}

export function setCharsPerRow(charsPerRow) {
  return {
    type: GridActionTypes.SET_CHARS_PER_ROW,
    charsPerRow
  }
}

export function setFormat(format) {
  return {
    type: GridActionTypes.SET_FORMAT,
    format
  }
}

export function setEmail(email) {
  return {
    type: GridActionTypes.SET_EMAIL,
    email
  }
}

export function setPrintPinyin(printPinyin) {
  return {
    type: GridActionTypes.SET_PRINT_PINYIN,
    printPinyin
  }
}

export function setPrintStrokes(printStrokes) {
  return {
    type: GridActionTypes.SET_PRINT_STROKES,
    printStrokes
  }
}

// Pinyins
export function addChars(chars) {
  return dispatch => {
    dispatch(sendPinyinRequest(chars))
    var query = chars.map((ch) => 'chars[]=' + Utils.charToHex(ch)).join('&')
    return fetch(`${API_ROOT}/pinyins?${query}`, {mode: 'cors'})
      .then(response => fetchHandler(response))
      .then(json => dispatch(receivePinyinResponse(json)))
      .catch(error => {
        dispatch(addError(GridActionTypes.ADD_ERROR, error))
        dispatch(requestPinyinFailed())
      })
  }
}

export function deleteChars() {
  return {
    type: GridActionTypes.DELETE_CHARS
  }
}

export function deleteChar(index) {
  return {
    type: GridActionTypes.DELETE_CHAR,
    index
  }
}

export function setCharPinyin(index, pinyin) {
  return {
    type: GridActionTypes.SET_CHAR_PINYIN,
    index: index,
    pinyin: pinyin
  }
}

export function sendPinyinRequest(chars) {
  return {
    type: GridActionTypes.SEND_PINYIN_REQUEST,
    chars
  }
}

export function receivePinyinResponse(json) {
  return {
    type: GridActionTypes.RECEIVE_PINYIN_RESPONSE,
    chars: json,
    receivedAt: Date.now()
  }
}

export function requestPinyinFailed(error) {
  return {
    type: GridActionTypes.REQUEST_PINYIN_FAILED,
    error
  }
}

// Submit
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
    return fetch(`${API_ROOT}/grid/email?${query}`, {mode: 'cors'})
      .then(response => fetchHandler(response))
      .then(json => dispatch(receiveGridResponse(json)))
      .catch(error => {
        dispatch(submitGridFailed())
        dispatch(addError(GridActionTypes.ADD_ERROR, error))
      })
  }
}

export function sendGridRequest() {
  return {
    type: GridActionTypes.SEND_GRID_REQUEST,
    sentAt: Date.now()
  }
}

export function receiveGridResponse(json) {
  return {
    type: GridActionTypes.RECEIVE_GRID_RESPONSE,
    json,
    receivedAt: Date.now()
  }
}

export function submitGridFailed(error) {
  return {
    type: GridActionTypes.SUBMIT_GRID_FAILED
  }
}

export function resetGrid() {
  return {
    type: GridActionTypes.RESET_GRID
  }
}
