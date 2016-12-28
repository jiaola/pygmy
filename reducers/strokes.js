import Immutable from 'immutable'
import StrokesActionTypes from '../actions/StrokesActionTypes'

export default (state = Immutable.Map({
  strokes: null,
  order: [],
  strokesLoaded: true
}), action) => {
  switch(action.type) {
    case StrokesActionTypes.RECEIVE_STROKES_RESPONSE:
      return state.set('strokes', action.json).set('strokesLoaded', true)
    case StrokesActionTypes.SORT_STROKES_ORDER:
      return state.set('order', action.order)
    case StrokesActionTypes.DELETE_CHARS:
      return state.set('strokes', null).set('order', [])
    case StrokesActionTypes.SEND_STROKES_REQUEST:
      return state.set('strokesLoaded', false)
    default:
      return state
  }
}
