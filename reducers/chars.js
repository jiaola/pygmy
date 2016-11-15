import Immutable from 'immutable'
import * as ActionTypes from '../actions'

export default (state = Immutable.List([]), action) => {
  switch(action.type) {
    case ActionTypes.ADD_CHAR:
      var char = Immutable.Map({character: action.character, unicode: action.character.charCodeAt(0).toString(16)})
      return state.push(char)
    case ActionTypes.DELETE_CHAR:
      return state.filter((char, index) => index !== action.index)
    case ActionTypes.RECEIVE_PINYIN:
      console.log('action', action, action.pinyin[0].pinyin)
      var start = state.count() - action.pinyin.length
      start = start > 0 ? start : 0
      for (var i = 0; i < action.pinyin.length; i++) {
        state = state.update(i+start, (item) => item.set('pinyin_list', action.pinyin[i].pinyin))
        state = state.update(i+start, (item) => item.set('pinyin', action.pinyin[0].pinyin[0]))
      }
      return state
    case ActionTypes.SET_CHAR_PINYIN:
      state = state.update(action.index, (char) => char.set('pinyin', action.pinyin))
      return state
    default:
      return state
  }
}
