import { combineReducers } from 'redux'
import chars from './chars'
import strokes from './strokes'
import options from './options'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  chars,
  options,
  strokes,
  routing: routerReducer
})

export default rootReducer
