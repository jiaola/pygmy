export function addError(type, error) {
  return {
    type: type + '_ADD_ERROR',
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
