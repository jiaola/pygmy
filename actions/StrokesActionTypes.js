import FluxConstant from 'flux-constant'

let StrokesActionTypes = FluxConstant.set([
  'SORT_STROKES',
  'SEND_STROKES_REQUEST',
  'RECEIVE_STROKES_RESPONSE',
  'DELETE_CHARS',
  'SEND_SORT_REQUEST',
  'RECEIVE_SORT_RESPONSE',
  'SUBMIT_SORT_FAILED'
])

export default StrokesActionTypes
