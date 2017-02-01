import Network from '../utils/network'
import WriterActionTypes from './WriterActionTypes'

export function requestChar(char, type) {
  let unicode = char.charCodeAt(0).toString(16)
  let resource = type === WriterActionTypes.WRITER? `big5/${unicode}` : `characters/${unicode}`
  return dispatch => dispatch({
    type: type,
    payload: Network().get({ resource: resource })
  })
}

export function addError(type, error) {
  return {
    type: type,
    error
  }
}

export function deleteError(type, index) {
  return {
    type: type + '_DELETE_ERROR',
    index
  }
}

export function deleteErrors(type) {
  return {
    type: type + '_DELETE_ERRORS'
  }
}

export function deleteMessages(type) {
  return {
    type: type + '_DELETE_MESSAGES'
  }
}
