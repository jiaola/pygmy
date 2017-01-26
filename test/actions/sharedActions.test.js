import * as actions from '../../actions/sharedActions'
import GridActionTypes from '../../actions/GridActionTypes'

describe('actions', () => {
  it('shoudl create an action to add an error', () => {
    const error = Error('this is an error')
    const type = GridActionTypes.ADD_ERROR

    const expectedAction = {
      type: type,
      error
    }

    expect(actions.addError(type, error)).toEqual(expectedAction)
  })
})
