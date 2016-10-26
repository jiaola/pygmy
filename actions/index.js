//import fetch from 'isomorphic-fetch'

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

function string_as_unicode_escape(input) {
    function pad_four(input) {
        var l = input.length;
        if (l == 0) return '0000';
        if (l == 1) return '000' + input;
        if (l == 2) return '00' + input;
        if (l == 3) return '0' + input;
        return input;
    }
    var output = '';
    for (var i = 0, l = input.length; i < l; i++)
        output += pad_four(input.charCodeAt(i).toString(16));
    return output;
}

export function fetchPinyin(chars) {
  console.log(chars)
  return dispatch => {
    dispatch(requestPinyin(chars))
    var query = chars.map((ch) => 'chars[]=' + string_as_unicode_escape(ch)).join('&')
    return fetch(`http://pygmy.brickowls.com/characters/pinyins?${query}`, {mode: 'no-cors'})
      .then(response => response.json)
      .then(json => dispatch(receivePinyin(chars, json)))
  }
}

export const REQUEST_STROKES = 'REQUEST_STROKES'
export const RECEIVE_STROKES = 'RECEIVE_STROKES'
