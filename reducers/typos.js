import Immutable from 'immutable'
import TyposActionTypes from '../actions/TyposActionTypes'

export default (state = Immutable.Map({
  strokes: null,
  hidden: Immutable.Set([]),
  charLoaded: true,
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
      return state.set('strokes', action.json.data).update('hidden', h => h.clear()).set('charLoaded', true)
    case TyposActionTypes.SEND_CHAR_REQUEST:
      return state.set('charLoaded', false)
    case TyposActionTypes.DELETE_CHARS:
      return state.set('strokes', null).update('hidden', h => h.clear())
    case TyposActionTypes.REQUEST_CHAR_FAILED:
      return state.set('charLoaded', true)
    case TyposActionTypes.ADD_ERROR:
      return state.set('errors', state.get('errors').push(action.error))
    case TyposActionTypes.DELETE_ERROR:
      return state.update('errors', e => e.filter((e, i) => i !== action.index))
    case TyposActionTypes.DELETE_ERRORS:
      return state.update('errors', e => e.clear())
    case TyposActionTypes.DELETE_MESSAGES:
      return state.update('messages', m => m.clear())
    default:
      return state
  }
}
