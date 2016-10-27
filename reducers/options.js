import Immutable from 'immutable'
import * as ActionTypes from '../actions'

export default (state = Immutable.Map({
  grids_per_row: 15,
  chars_per_row: 3,
  format: 'field',
  pinyin: true,
  strokes: false,
  email: ''
}), action) => {
  switch(action.type) {
    case ActionTypes.SET_PINYIN:
      return state.set('pinyin', action.pinyin)
    case ActionTypes.SET_STROKES:
      return state.set('strokes', action.strokes)
    case ActionTypes.SET_GRIDS_PER_ROW:
      return state.set('grids_per_row', action.grids_per_row)
    case ActionTypes.SET_FORMAT:
      return state.set('format', action.format)
    case ActionTypes.SET_CHARS_PER_ROW:
      return state.set('chars_per_row', action.chars_per_row)
    case ActionTypes.SET_EMAIL:
      return state.set('email', action.email)
    default:
      return state
  }
}
