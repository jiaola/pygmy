import Immutable from 'immutable'
import TyposActionTypes from '../actions/TyposActionTypes'

export default (state = Immutable.Map({
  strokes: null,
  hidden: Immutable.Set([]),
  typosLoaded: true,
  errors: Immutable.List([]),
  messages: Immutable.List([])
}), action) => {
  switch(action.type) {
    case TyposActionTypes.SELECT_STROKE:
      let hidden = state.get('hidden')
      let index = parseInt(action.index)
      if (hidden.includes(index)) {
        return state.set('hidden', hidden.delete(index))
      } else {
        return state.set('hidden', hidden.add(index))
      }
    case TyposActionTypes.RECEIVE_CHAR_RESPONSE:
      return state.set('strokes', action.json).set('hidden', state.get('hidden').clear()).set('typosLoaded', true)
    case TyposActionTypes.SEND_TYPOS_REQUEST:
      return state.set('typosLoaded', false)
    case TyposActionTypes.DELETE_CHARS:
      return state.set('strokes', null).set('hidden', state.get('hidden').clear())
    case TyposActionTypes.REQUEST_CHAR_FAILED:
      return state.set('typosLoaded', true)
    case TyposActionTypes.ADD_ERROR:
      return state.set('errors', state.get('errors').push(action.error))
    case TyposActionTypes.DELETE_ERROR:
      return state.set('errors', state.get('errors').filter((e, i) => i !== action.index))
    case TyposActionTypes.DELETE_ERRORS:
      return state.set('errors', state.get('errors').clear())
    case TyposActionTypes.DELETE_MESSAGES:
      return state.set('messages', state.get('messages').clear())
    default:
      return state
  }
}
