import Immutable from 'immutable'
import * as ActionTypes from '../actions'

export default (state = Immutable.Map({
  grids_per_row: 15,
  chars_per_row: 3,
  grid: 'field',
  pinyin: true,
  strokes: true
}), action) => {
  switch(action.type) {
    case ActionTypes.SET_PINYIN:
      state.set('pinyin', action.pinyin)
    case ActionTypes.SET_STROKE:
      state.set('strokes', action.strokes)
    case ActionTypes.SET_GRIDS_PER_ROW:
      return Object.assign({}, state, {
        grids_per_row: action.grids_per_row
      })
    case ActionTypes.SET_FORMAT:
      return Object.assign({}, state, {
        format: action.format
      })
    case ActionTypes.SET_CHARS_PER_ROW:
      return Object.assign({}, state, {
        chars_per_row: action.chars_per_row
      })
    default:
      return state
  }
}
