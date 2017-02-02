import Immutable from 'immutable'
import typeToReducer from 'type-to-reducer'
import { TYPOS } from '../actions/ActionTypes'
import { alertStates, alertReducers } from '../utils/alerts'

const initialState = Immutable.Map({
  ...alertStates
})

export default typeToReducer({
  [TYPOS]: {
    ...alertReducers,
  },
}, initialState)
