import FluxConstant from 'flux-constant'

let TyposActionTypes = FluxConstant.set([
  'SELECT_STROKE',
  'RECEIVE_CHAR_RESPONSE',
  'SEND_CHAR_REQUEST',
  'REQUEST_CHAR_FAILED',
  'DELETE_CHARS',
  'ADD_ERROR',
  'DELETE_ERROR',
  'DELETE_ERRORS',
  'DELETE_MESSAGES'
])

export default TyposActionTypes
