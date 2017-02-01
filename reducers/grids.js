import Immutable from 'immutable'
import GridActionTypes from '../actions/GridActionTypes'
import typeToReducer from 'type-to-reducer'
import { alertStates, alertReducers } from '../utils/alerts'

let initialState = Immutable.Map({
  loading: false,
  ...alertStates,
})

export default typeToReducer({
  [GridActionTypes.GRID]: {
    PENDING: (state, action) => ( state.set('loading', true) ),
    REJECTED: (state, action) => (
      state.update('errors', e => e.push(action.payload)).set('loading', false)
    ),
    FULFILLED: (state, action) => (
      initialState.set('messages', state.get('messages').push(action.payload))
    ),
    ...alertReducers,
  },
}, initialState)
