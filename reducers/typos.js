import Immutable from 'immutable'
import * as ActionTypes from '../actions/actionTypes'

export default (state = Immutable.Map({
  strokes: null,
  hidden: Immutable.Set([]),
  order: []
}), action) => {
  switch(action.type) {
    case ActionTypes.HIDE_STROKE:
      return state.set('hidden', state.get('hidden').add(action.index))
    case ActionTypes.SHOW_STROKE:
      return state.set('hidden', state.get('hidden').delete(action.index))
    case ActionTypes.RECEIVE_TYPOS_RESPONSE:
      return state.set('strokes', action.json)
    default:
      return state
  }
}
