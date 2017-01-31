import Immutable from 'immutable'
import GridActionTypes from '../actions/GridActionTypes'
import typeToReducer from 'type-to-reducer'

let initialState = Immutable.Map({
  loading: false,
  errors: Immutable.List([]),
  messages: Immutable.List([])
})

export default typeToReducer({
  [GridActionTypes.GRID]: {
    PENDING: (state, action) => ( state.set('loading', true) ),
    REJECTED: (state, action) => (
      state.update('errors', e => e.push(action.payload)).set('loading', false)
    ),
    FULFILLED: (state, action) => (
      initialState.set('messages', state.get('messages').push(action.payload))
    )
  },
  [GridActionTypes.ADD_ERROR]: (state, action) => {
    return state.update('errors', e => e.push(action.error))
  },
  [GridActionTypes.DELETE_ERRORS]: (state, action) => {
    return state.update('errors', e => e.clear())
  },
  [GridActionTypes.DELETE_MESSAGES]: (state, action) => {
    return state.update('messages', m => m.clear())
  }
}, initialState)
