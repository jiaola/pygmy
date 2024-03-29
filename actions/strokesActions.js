import { STROKES } from './ActionTypes'
import Network from '../utils/network'

export function submitSort(strokes, order) {
  let unicode = strokes.attributes.unicode
  let query = order.map((o) => 'order[]=' + o).join('&')
  return dispatch => dispatch({
    type: STROKES,
    payload: Network().put({ resource: `characters/${unicode}`, query: query })
  })
}
