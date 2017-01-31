import Immutable from 'immutable'
import GridActionTypes from '../actions/GridActionTypes'
import typeToReducer from 'type-to-reducer'

let initialState = Immutable.Map({
  gridsCreated: true,
  charsLoaded: true,
  errors: Immutable.List([]),
  messages: Immutable.List([])
})

export default typeToReducer({
  [GridActionTypes.GRID]: {
    PENDING: (state, action) => ( state ),
    REJECTED: (state, action) => (
      state.update('errors', e => e.push(action.payload))
    ),
    FULFILLED: (state, action) => {
      return initialState.set('messages', state.get('messages').push(action.payload))
    }
  },
  [GridActionTypes.ADD_ERROR]: (state, action) => {
    return state.update('errors', e => e.push(action.error))
  },
  [GridActionTypes.DELETE_ERRORS]: (state, action) => {
    return state.update('errors', e => e.clear())
  },
  [GridActionTypes.DELETE_MESSAGES]: (state, action) => {
    return state.update('messages', m => m.clear())
  }
}, initialState)

//
//
// export default  (state = initialState, action) => {
//   switch(action.type) {
//     case GridActionTypes.SEND_GRID_REQUEST:
//       return state.set('gridsCreated', false)
//     case GridActionTypes.RECEIVE_GRID_RESPONSE:
//       return initialState.set('messages', state.get('messages').push(action.json))
//     case GridActionTypes.SUBMIT_GRID_FAILED:
//       return state.set('gridsCreated', true)
//     case GridActionTypes.RESET_GRID:
//       return initialState
//     case GridActionTypes.ADD_ERROR:
//       return state.set('errors', state.get('errors').push(action.error))
//     case GridActionTypes.DELETE_ERROR:
//       return state.update('errors', e => e.filter((e, i) => i !== action.index))
//     case GridActionTypes.DELETE_ERRORS:
//       return state.update('errors', e => e.clear())
//     case GridActionTypes.DELETE_MESSAGES:
//       return state.update('messages', m => m.clear())
//     default:
//       return state
//   }
// }
//
// export const gridRequestReducer = typeToReducer({
//   [GridActionTypes.PINYIN]: {
//     PENDING: (state, action) => ( state ),
//     REJECTED: (state, action) => (
//       state.update('errors', e => e.push(action.payload))
//     ),
//     FULFILLED: (state, action) => {
//       console.log('state', state, 'action', action)
//       for (var i = 0; i < action.payload.length; i++) {
//         console.log('action.payload', action.payload[i])
//         var char = action.payload[i]
//         char.selectedPinyin = char.pinyin[0]
//         state = state.set('chars', state.get('chars').push(Immutable.Map(char)))
//       }
//       console.log(state.get('chars'))
//       return state.set('charsLoaded', true)
//     }
//   }
// }, initialState)
