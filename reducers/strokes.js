import Immutable from 'immutable'
import * as ActionTypes from '../actions'

export default (state = Immutable.Map({
  strokes: null,
  order: []
}), action) => {
  switch(action.type) {
    case ActionTypes.RECEIVE_STROKES_RESPONSE:
      return state.set('strokes', action.json)
    default:
      return state
  }
}
