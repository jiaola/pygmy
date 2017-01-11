import FluxConstant from 'flux-constant'

let StrokesActionTypes = FluxConstant.set([
  'SORT_STROKES',
  'SEND_CHAR_REQUEST',
  'RECEIVE_CHAR_RESPONSE',
  'REQUEST_CHAR_FAILED',
  'DELETE_CHARS',
  'SEND_SORT_REQUEST',
  'RECEIVE_SORT_RESPONSE',
  'SUBMIT_SORT_FAILED',
  'ADD_ERROR',
  'DELETE_ERROR',
  'DELETE_ERRORS',
  'DELETE_MESSAGES'
])

export default StrokesActionTypes
