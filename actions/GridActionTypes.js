import FluxConstant from 'flux-constant'

let GridActionTypes = FluxConstant.set([
  // Forms
  'SET_GRIDS_PER_ROW',
  'SET_CHARS_PER_ROW',
  'SET_FORMAT',
  'SET_EMAIL',
  'SET_PRINT_STROKES',
  'SET_PRINT_PINYIN',
  // Pinyins
  'DELETE_CHARS',
  'DELETE_CHAR',
  'SET_CHAR_PINYIN',
  'SEND_PINYIN_REQUEST',
  'RECEIVE_PINYIN_RESPONSE',
  'REQUEST_PINYIN_FAILED',
  // Submit
  'SEND_GRID_REQUEST',
  'RECEIVE_GRID_RESPONSE',
  'SUBMIT_GRID_FAILED',
  'RESET_GRID',
  'ADD_ERROR',
  'DELETE_ERROR',
  'DELETE_ERRORS',
  'DELETE_MESSAGES'
])

export default GridActionTypes
