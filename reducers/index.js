import { combineReducers } from 'redux'
import strokes from './strokes'
import grids from './grids'
import typos from './typos'
import writer from './writer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  grids,
  strokes,
  typos,
  writer,
  routing: routerReducer
})

export default rootReducer
