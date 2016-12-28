import Immutable from 'immutable'
import GridActionTypes from '../actions/GridActionTypes'
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
    // forms
    case GridActionTypes.SET_GRIDS_PER_ROW:
      return state.set('gridsPerRow', action.gridsPerRow)
    case GridActionTypes.SET_CHARS_PER_ROW:
      return state.set('charsPerRow', action.charsPerRow)
    case GridActionTypes.SET_FORMAT:
      return state.set('gridFormat', action.format)
    case GridActionTypes.SET_EMAIL:
      return state.set('email', action.email)
    case GridActionTypes.SET_PRINT_PINYIN:
      return state.set('printPinyin', action.printPinyin)
    case GridActionTypes.SET_PRINT_STROKES:
      return state.set('printStrokes', action.printStrokes)
    // pinyins
    case GridActionTypes.DELETE_CHARS:
      return state.set('chars', state.get('chars').clear())
    case GridActionTypes.DELETE_CHAR:
      var chars = state.get('chars').filter((char, index) => index !== action.index)
      return state.set('chars', chars)
    case GridActionTypes.SEND_PINYIN_REQUEST:
      return state.set('charsLoaded', false)
    case GridActionTypes.RECEIVE_PINYIN_RESPONSE:
      for (var i = 0; i < action.chars.length; i++) {
        var char = action.chars[i]
        char.selectedPinyin = char.pinyin[0]
        state = state.set('chars', state.get('chars').push(Immutable.Map(char)))
      }
      return state.set('charsLoaded', true)
    case GridActionTypes.REQUEST_PINYIN_FAILED:
      return state.set('charsLoaded', true)
    case GridActionTypes.SET_CHAR_PINYIN:
      return state.set('chars', state.get('chars').update(action.index, (char) => char.set('selectedPinyin', action.pinyin)))
      // TODO: Process error
    // Submit
    case GridActionTypes.SEND_GRID_REQUEST:
      return state.set('gridsCreated', false)
    case GridActionTypes.RECEIVE_GRID_RESPONSE:
      return state.set('gridsCreated', true)
    case GridActionTypes.SUBMIT_GRID_FAILED:
      return state.set('gridsCreated', true)
      console.log('Submit grid failed')
    case GridActionTypes.RESET_GRID:
      return initialState
      return state
    default:
      return state
  }
}
