import { combineReducers } from 'redux'
import strokes from './strokes'
import grids from './grids'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  grids,
  strokes,
  routing: routerReducer
})

export default rootReducer
