import TyposActionTypes from './TyposActionTypes'

export function selectStroke(index) {
  return {
    type: TyposActionTypes.SELECT_STROKE,
    index
  }
}

export function deleteChars() {
  return {
    type: TyposActionTypes.DELETE_CHARS
  }
}
