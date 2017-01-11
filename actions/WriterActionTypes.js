import FluxConstant from 'flux-constant'

let WriterActionTypes = FluxConstant.set([
  'RECEIVE_CHAR_RESPONSE',
  'SEND_CHAR_REQUEST',
  'REQUEST_CHAR_FAILED',
  'ADD_ERROR',
  'DELETE_ERROR',
  'DELETE_ERRORS',
  'DELETE_MESSAGES'  
])

export default WriterActionTypes
