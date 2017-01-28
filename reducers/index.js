import { combineReducers } from 'redux'
import strokes from './strokes'
import grids, { gridRequestReducer } from './grids'
import typos from './typos'
import writer from './writer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  grids,
  strokes,
  typos,
  writer,
  gridRequestReducer,
  routing: routerReducer
})

export default rootReducer
