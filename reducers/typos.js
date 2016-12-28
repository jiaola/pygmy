import Immutable from 'immutable'
import TyposActionTypes from '../actions/TyposActionTypes'

export default (state = Immutable.Map({
  strokes: null,
  hidden: Immutable.Set([]),
  typosLoaded: true
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
    case TyposActionTypes.RECEIVE_TYPOS_RESPONSE:
      return state.set('strokes', action.json).set('hidden', state.get('hidden').clear()).set('typosLoaded', true)
    case TyposActionTypes.SEND_TYPOS_REQUEST:
      return state.set('typosLoaded', false)
    case TyposActionTypes.DELETE_CHARS:
      return state.set('strokes', null).set('hidden', state.get('hidden').clear())
    default:
      return state
  }
}
