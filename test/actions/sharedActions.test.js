import * as actions from '../../actions/sharedActions'
import { GRID } from '../../actions/ActionTypes'

describe('actions', () => {
  it('shoudl create an action to add an error', () => {
    const error = Error('this is an error')
    const type = GRID

    const expectedAction = {
      type: type + '_ADD_ERROR',
      error
    }

    expect(actions.addError(type, error)).toEqual(expectedAction)
  })
})
