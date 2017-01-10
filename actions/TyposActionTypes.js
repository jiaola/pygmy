import FluxConstant from 'flux-constant'

let TyposActionTypes = FluxConstant.set([
  'SELECT_STROKE',
  'RECEIVE_TYPOS_RESPONSE',
  'SEND_TYPOS_REQUEST',
  'DELETE_CHARS',
  'REQUEST_TYPOS_FAILED',
  'ADD_ERROR',
  'DELETE_ERROR',
  'DELETE_ERRORS',
  'DELETE_MESSAGES'
])

export default TyposActionTypes