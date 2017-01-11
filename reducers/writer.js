import Immutable from 'immutable'
import WriterActionTypes from '../actions/WriterActionTypes'

let initialState = Immutable.Map({
  strokes: null,
  hidden: Immutable.Set([]),
  typosLoaded: true,
  errors: Immutable.List([]),
  messages: Immutable.List([])
})

export default (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}
