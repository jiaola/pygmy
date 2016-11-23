import { combineReducers } from 'redux'
import chars from './chars'
import options from './options'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  chars,
  options,
  routing: routerReducer
})

export default rootReducer
