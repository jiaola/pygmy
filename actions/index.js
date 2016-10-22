export const ADD_CHAR = 'ADD_CHAR'
export const DELETE_CHAR = 'DELETE_CHAR'
export const REQUEST_PINYIN = 'REQUEST_PINYIN'
export const RECEIVE_PINYIN = 'RECEIVE_PINYIN'
export const REQUEST_STROKES = 'REQUEST_STROKES'
export const RECEIVE_STROKES = 'RECEIVE_STROKES'
export const SET_PINYIN = 'SET_PINYIN'
export const SET_STROKES = 'SET_STROKES'
export const SET_FORMAT = 'SET_FORMAT'
export const SET_GRIDS_PER_ROW = 'SET_GRIDS_PER_ROW'
export const SET_CHARS_PER_ROW = 'SET_CHARS_PER_ROW'

export function addChar(character) {
  return {
    type: ADD_CHAR,
    character
  }
}

export function deleteChar(index) {
  return {
    type: DELETE_CHAR,
    index
  }
}

export function setGridsPerRow(grids_per_row) {
  return {
    type: SET_GRIDS_PER_ROW,
    grids_per_row
  }
}

export function setCharsPerRow(chars_per_row) {
  return {
    type: SET_CHARS_PER_ROW,
    chars_per_row
  }
}

export function setFormat(format) {
  return {
    type: SET_FORMAT,
    format
  }
}

export function setPinyin(pinyin) {
  return {
    type: SET_PINYIN,
    pinyin
  }
}

export function setStrokes(strokes) {
  return {
    type: SET_STROKES,
    strokes
  }
}
