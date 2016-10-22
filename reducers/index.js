import { combineReducers } from 'redux'
import chars from './chars'
import options from './options'

const rootReducer = combineReducers({
  chars,
  options
})

export default rootReducer
