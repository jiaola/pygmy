import Immutable from 'immutable'
import StrokesActionTypes from '../actions/StrokesActionTypes'
import * as Utils from '../utils'
import typeToReducer from 'type-to-reducer'

const initialState = Immutable.Map({
  strokes: null,
  order: [],
  loadingChar: false,
  loading: false,
  errors: Immutable.List([]),
  messages: Immutable.List([])
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
  [StrokesActionTypes.ADD_ERROR]: (state, action) => (
    state.update('errors', e => e.push(action.error))
  ),
  [StrokesActionTypes.DELETE_ERRORS]: (state, action) => (
    state.update('errors', e => e.clear())
  ),
  [StrokesActionTypes.DELETE_MESSAGES]: (state, action) => (
    state.update('messages', m => m.clear())
  ),
}, initialState)

