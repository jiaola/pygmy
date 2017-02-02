import StrokesActionTypes from './StrokesActionTypes'
import Network from '../utils/network'

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

export function submitSort(strokes, order) {
  let unicode = strokes.attributes.unicode
  let query = order.map((o) => 'order[]=' + o).join('&')
  return dispatch => dispatch({
    type: StrokesActionTypes.STROKES,
    payload: Network().put({ resource: `characters/${unicode}`, query: query })
  })
}
