export let hexToChar = (hex) => (String.fromCodePoint(parseInt(hex, 16)))
export let charToHex = (char) => (char.charCodeAt(0).toString(16))
export let charsToQuery = (chars) => (
  chars.map((ch) => 'chars[]=' + charToHex(ch)).join('&')
)

export let errorToString = (m) => {
  if ( m == null) return null
  if (typeof m === 'string') {
    return m
  } else if (m.hasOwnProperty('message')) {
    return m.message
  } else {
    return m.toString()
  }
}