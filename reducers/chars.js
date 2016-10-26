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
      return ''
    default:
      return state
  }
}
