import { GRID } from './ActionTypes'
import Network from '../utils/network'
import querystring from 'querystring'

export function submitGridForm(options, chars) {
  let query = chars.map((ch) => 'chars[]=' + ch.get('character')).join('&')
  query += '&' + chars.map((ch) => 'pinyins[]=' + ch.get('selectedPinyin')).join('&')
  query += '&' + querystring.stringify(options)
  return dispatch => dispatch({
    type: GRID,
    payload: Network().get({ resource: 'grid/email', query: query})
  })
}
