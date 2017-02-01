import Immutable from 'immutable'
import StrokesActionTypes from '../actions/StrokesActionTypes'
import * as Utils from '../utils'
import typeToReducer from 'type-to-reducer'
import { alertStates, alertReducers } from '../utils/alerts'

const initialState = Immutable.Map({
  strokes: null,
  order: [],
  loadingChar: false,
  loading: false,
  ...alertStates
})

export default typeToReducer({
  [StrokesActionTypes.STROKES]: {
    PENDING: (state, action) => ( state.set('loading', true) ),
    REJECTED: (state, action) => (
      state.update('errors', e => e.push(action.payload)).set('loading', false)
    ),
    FULFILLED: (state, action) => (
      initialState.set('messages', state.get('messages').push(`“${Utils.hexToChar(action.payload.data.attributes.unicode)}”的笔顺已顺利提交。谢谢编辑！`))
    ),
    ...alertReducers,
  },
  [StrokesActionTypes.REQUEST_CHAR]: {
    PENDING: (state, action) => ( state.set('loadingChar', true) ),
    REJECTED: (state, action) => (
      state.update('errors', e => e.push(action.payload)).set('loadingChar', false)
    ),
    FULFILLED: (state, action) => {
      console.log(state, action)
      let data = action.payload.data
      let N = data.attributes.stroke.length
      let order = Array.apply(null, {length: N}).map(Number.call, Number)
      return state.set('strokes', data).set('loadingChar', false).set('order', order)
    },
  },
  [StrokesActionTypes.SORT_STROKES]: (state, action) => (
    state.set('order', action.order)
  ),
  [StrokesActionTypes.DELETE_CHARS]: (state, action) => (
    state.set('strokes', null).set('order', [])
  ),
}, initialState)

