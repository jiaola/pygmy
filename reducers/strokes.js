import Immutable from 'immutable'
import * as ActionTypes from '../actions/actionTypes'

export default (state = Immutable.Map({
  strokes: null,
  order: []
}), action) => {
  switch(action.type) {
    case ActionTypes.RECEIVE_STROKES_RESPONSE:
      return state.set('strokes', action.json)
    case ActionTypes.SORT_STROKES_ORDER:
      return state.set('order', action.order)
    default:
      return state
  }
}
