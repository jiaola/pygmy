import Immutable from 'immutable'
import StrokesActionTypes from '../actions/StrokesActionTypes'
import * as Utils from '../utils'
import typeToReducer from 'type-to-reducer'
import { alertStates, alertReducers } from '../utils/alerts'

const initialState = Immutable.Map({
  order: [],
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
}, initialState)

