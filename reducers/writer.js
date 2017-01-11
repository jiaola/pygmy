import Immutable from 'immutable'
import WriterActionTypes from '../actions/WriterActionTypes'

let initialState = Immutable.Map({
  strokes: null,
  hidden: Immutable.Set([]),
  charLoaded: true,
  errors: Immutable.List([]),
  messages: Immutable.List([])
})

export default (state = initialState, action) => {
  switch(action.type) {
    case WriterActionTypes.SEND_CHAR_REQUEST:
      return state.set('charLoaded', false)
    case WriterActionTypes.RECEIVE_CHAR_RESPONSE:
      return state.set('strokes', action.json).set('charLoaded', true)
    case WriterActionTypes.REQUEST_CHAR_FAILED:
      return state.set('charLoaded', true)
    case WriterActionTypes.ADD_ERROR:
      return state.set('errors', state.get('errors').push(action.error))
    case WriterActionTypes.DELETE_ERROR:
      return state.update('errors', e => e.filter((e, i) => i !== action.index))
    case WriterActionTypes.DELETE_ERRORS:
      return state.update('errors', e => e.clear())
    case WriterActionTypes.DELETE_MESSAGES:
      return state.update('messages', m => m.clear())
    default:
      return state
  }
}
