import Immutable from 'immutable'

export const alertStates = {
  errors: Immutable.List([]),
  messages: Immutable.List([])
}

export const alertReducers = {
  ADD_ERROR: (state, action) => (
    state.update('errors', e => e.push(action.error))
  ),
  DELETE_ERRORS: (state, action) => (
    state.update('errors', e => e.clear())
  ),
  DELETE_MESSAGES: (state, action) => (
    state.update('messages', m => m.clear())
  ),
}