import Immutable from 'immutable'
import typeToReducer from 'type-to-reducer'
import TyposActionTypes from '../actions/TyposActionTypes'
import { alertStates, alertReducers } from '../utils/alerts'

const initialState = Immutable.Map({
  ...alertStates
})

export default typeToReducer({
  [TyposActionTypes.TYPOS]: {
    ...alertReducers,
  },
}, initialState)
