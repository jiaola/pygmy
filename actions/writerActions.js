import WriterActionTypes from './WriterActionTypes'

export function selectStroke(index) {
  return {
    type: WriterActionTypes.SELECT_STROKE,
    index
  }
}

export function deleteChars() {
  return {
    type: WriterActionTypes.DELETE_CHARS
  }
}
