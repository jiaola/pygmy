import Immutable from 'immutable'
import StrokesActionTypes from '../actions/StrokesActionTypes'

export default (state = Immutable.Map({
  strokes: null,
  order: [],
  strokesLoaded: true,
  sortSubmitted: false,
  errors: Immutable.List([])
}), action) => {
  switch(action.type) {
    case StrokesActionTypes.RECEIVE_STROKES_RESPONSE:
      return state.set('strokes', action.json).set('strokesLoaded', true)
    case StrokesActionTypes.SORT_STROKES:
      return state.set('order', action.order)
    case StrokesActionTypes.DELETE_CHARS:
      return state.set('strokes', null).set('order', [])
    case StrokesActionTypes.SEND_STROKES_REQUEST:
      return state.set('strokesLoaded', false)
    case StrokesActionTypes.REQUEST_STROKES_FAILED:
      return state.set('strokesLoaded', true)
    case StrokesActionTypes.SEND_SORT_REQUEST:
      return state.set('sortSubmitted', true)
    case StrokesActionTypes.RECEIVE_SORT_RESPONSE:
      return state.set('sortSubmitted', false)
    case StrokesActionTypes.SUBMIT_SORT_FAILED:
      return state.set('sortSubmitted', false)
    case StrokesActionTypes.ADD_ERROR:
      return state.set('errors', state.get('errors').push(action.error))
    case StrokesActionTypes.DELETE_ERROR:
      return state.set('errors', state.get('errors').filter((e, i) => i !== action.index))
    case StrokesActionTypes.DELETE_ERRORS:
      return state.set('errors', state.get('errors').clear())
    default:
      return state
  }
}
