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
    pinyin: json.data.children,
    receivedAt: Date.now()
  }
}

export function fetchPinyin(chars) {
  return function(dispatch) {
    
  }
}

export const REQUEST_STROKES = 'REQUEST_STROKES'
export const RECEIVE_STROKES = 'RECEIVE_STROKES'
