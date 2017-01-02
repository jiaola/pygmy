export const API_ROOT = 'http://localhost:3000'

export function fetchHandler(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response.json()
}

export function addError(type, error) {
  return {
    type: type,
    error
  }
}

export function deleteError(type, index) {
  return {
    type,
    index
  }
}

export function deleteErrors(type) {
  return {
    type
  }
}
