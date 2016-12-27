import Immutable from 'immutable'
import * as ActionTypes from '../actions/actionTypes'

export default (state = Immutable.Map({
  strokes: null,
  hidden: Immutable.Set([]),
  order: []
}), action) => {
  switch(action.type) {
    case ActionTypes.SELECT_STROKE:
      let hidden = state.get('hidden')
      let index = parseInt(action.index)
      if (hidden.includes(index)) {
        return state.set('hidden', hidden.delete(index))
      } else {
        return state.set('hidden', hidden.add(index))
      }
    case ActionTypes.SHOW_STROKE:
      return state.set('hidden', state.get('hidden').delete(action.index))
    case ActionTypes.RECEIVE_TYPOS_RESPONSE:
      return state.set('strokes', action.json).set('hidden', state.get('hidden').clear())
    default:
      return state
  }
}
