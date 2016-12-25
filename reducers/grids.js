import Immutable from 'immutable'
import * as ActionTypes from '../actions/actionTypes'
import * as Utils from '../utils/Utils'

const initialState = Immutable.Map({
  gridsPerRow: 15,
  charsPerRow: 3,
  gridFormat: 'field',
  printPinyin: true,
  printStrokes: false,
  email: '',
  gridsCreated: true,
  chars: Immutable.List([]),
  charsLoaded: true
})

export default (state = initialState, action) => {
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
    case ActionTypes.SEND_GRID_REQUEST:
      return state.set('gridsCreated', false)
    case ActionTypes.RECEIVE_GRID_RESPONSE:
      return state.set('gridsCreated', true)
    case ActionTypes.RESET_GRID:
      return initialState
    case ActionTypes.DELETE_CHARS:
      return state.set('chars', state.get('chars').clear())
    case ActionTypes.DELETE_CHAR:
      var chars = state.get('chars').filter((char, index) => index !== action.index)
      return state.set('chars', chars)
    case ActionTypes.REQUEST_PINYIN:
      return state.set('charsLoaded', false)
    case ActionTypes.RECEIVE_PINYIN:
      for (var i = 0; i < action.chars.length; i++) {
        var char = action.chars[i]
        char.selectedPinyin = char.pinyin[0]
        state = state.set('chars', state.get('chars').push(Immutable.Map(char)))
      }
      console.log('chars state', state.get('chars'))
      return state.set('charsLoaded', true)
    case ActionTypes.REQUEST_PINYIN_FAILED:
      return state.set('charsLoaded', true)
    case ActionTypes.SET_CHAR_PINYIN:
      return state.set('chars', state.get('chars').update(action.index, (char) => char.set('selectedPinyin', action.pinyin)))
    default:
      return state
  }
}
