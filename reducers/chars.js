
import Immutable from 'immutable'
import * as ActionTypes from '../actions'

export default (state = Immutable.List([]), action) => {
  switch(action.type) {
    case ActionTypes.ADD_CHAR:
      return state.push(action.character)
    case ActionTypes.DELETE_CHAR:
      return state.filter((char, index) => index !== action.index)
    default:
      return state
  }
}
