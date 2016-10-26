// import fetch from 'isomorphic-fetch'

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
  console.log(chars, json)
  return {
    type: RECEIVE_PINYIN,
    chars,
    pinyin: json.data.children,
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
  console.log(chars)
  return dispatch => {
    dispatch(requestPinyin(chars))
    var query = chars.map((ch) => 'chars[]=' + ch.charCodeAt(0).toString(16)).join('&')
    return fetch(`http://pygmy.brickowls.com/characters/pinyins?${query}`, {mode: 'cors'})
      .then(response => { console.log(response, response.json()); return response.json(); })
      .then(json => { console.log (json); dispatch(receivePinyin(chars, json)); })
  }
}

export const REQUEST_STROKES = 'REQUEST_STROKES'
export const RECEIVE_STROKES = 'RECEIVE_STROKES'
