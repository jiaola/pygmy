import Immutable from 'immutable'
import StrokesActionTypes from '../actions/StrokesActionTypes'

const initialState = Immutable.Map({
  strokes: null,
  order: [],
  strokesLoaded: true,
  sortSubmitted: false,
  errors: Immutable.List([]),
  messages: Immutable.List([])
})

export default (state = initialState, action) => {
  switch(action.type) {
    case StrokesActionTypes.RECEIVE_CHAR_RESPONSE:
      console.log('strokes', action.json)
      let N = action.json.Stroke.length
      let order = Array.apply(null, {length: N}).map(Number.call, Number)
      return state.set('strokes', action.json).set('strokesLoaded', true).set('order', order)
    case StrokesActionTypes.SORT_STROKES:
      return state.set('order', action.order)
    case StrokesActionTypes.DELETE_CHARS:
      return state.set('strokes', null).set('order', [])
    case StrokesActionTypes.SEND_CHAR_REQUEST:
      return state.set('strokesLoaded', false)
    case StrokesActionTypes.REQUEST_CHAR_FAILED:
      return state.set('strokesLoaded', true)
    case StrokesActionTypes.SEND_SORT_REQUEST:
      return state.set('sortSubmitted', true)
    case StrokesActionTypes.RECEIVE_SORT_RESPONSE:
      console.log("action.json", action.json.message)
      return initialState.set('messages', state.get('messages').push(action.json))
    case StrokesActionTypes.SUBMIT_SORT_FAILED:
      return state.set('sortSubmitted', false)
    case StrokesActionTypes.ADD_ERROR:
      return state.set('errors', state.get('errors').push(action.error))
    case StrokesActionTypes.DELETE_ERROR:
      return state.set('errors', state.get('errors').filter((e, i) => i !== action.index))
    case StrokesActionTypes.DELETE_ERRORS:
      return state.set('errors', state.get('errors').clear())
    case StrokesActionTypes.DELETE_MESSAGES:
      return state.set('messages', state.get('messages').clear())
    default:
      return state
  }
}
