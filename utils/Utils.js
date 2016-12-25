export let hexToChar = (hex) => {
  console.log('hex', hex)
  return String.fromCodePoint(parseInt(hex, 16))
}
export let charToHex = (char) => (char.charCodeAt(0).toString(16))
