import Immutable from 'immutable'
import * as ActionTypes from '../actions/actionTypes'

export default (state = Immutable.Map({
  gridsPerRow: 15,
  charsPerRow: 3,
  gridFormat: 'field',
  printPinyin: true,
  printStrokes: false,
  email: ''
}), action) => {
  switch(action.type) {
    case ActionTypes.SET_PRINT_PINYIN:
      console.log('action: ', action)
      return state.set('printPinyin', action.printPinyin)
    case ActionTypes.SET_PRINT_STROKES:
      return state.set('printStrokes', action.printStrokes)
    case ActionTypes.SET_GRIDS_PER_ROW:
      return state.set('gridsPerRow', action.gridsPerRow)
    case ActionTypes.SET_FORMAT:
      return state.set('gridFormat', action.format)
    case ActionTypes.SET_CHARS_PER_ROW:
      return state.set('charsPerRow', action.charsPerRow)
    case ActionTypes.SET_EMAIL:
      return state.set('email', action.email)
    default:
      return state
  }
}
