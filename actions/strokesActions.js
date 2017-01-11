import fetch from 'isomorphic-fetch'
import StrokesActionTypes from './StrokesActionTypes'
import { API_ROOT } from './index'
import { fetchHandler, addError } from './sharedActions'

export function deleteChars() {
  return {
    type: StrokesActionTypes.DELETE_CHARS
  }
}

export function sortStrokes(order) {
  return {
    type: StrokesActionTypes.SORT_STROKES,
    order
  }
}

export function submitSort(strokes) {
  var unicode = strokes.get('strokes').unicode
  var order = strokes.get('order')
  return dispatch => {
    dispatch(sendSortRequest())
    var query = order.map((o) => 'order[]=' + o).join('&')
    query += '&unicode=' + unicode
    return fetch(`${API_ROOT}/characters/reorder?${query}`, {mode: 'cors'})
      .then(response => fetchHandler(response))
      .then(json => dispatch(receiveSortResponse(json)))
      .catch(error => {
        dispatch(submitSortFailed())
        dispatch(addError(StrokesActionTypes.ADD_ERROR, error))
      })
  }
}

export function sendSortRequest() {
  return {
    type: StrokesActionTypes.SEND_SORT_REQUEST
  }
}

export function receiveSortResponse(json) {
  return {
    type: StrokesActionTypes.RECEIVE_SORT_RESPONSE,
    json
  }
}

export function submitSortFailed() {
  return {
    type: StrokesActionTypes.SUBMIT_SORT_FAILED
  }
}
