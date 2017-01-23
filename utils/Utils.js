export let hexToChar = (hex) => (String.fromCodePoint(parseInt(hex, 16)))
export let charToHex = (char) => (char.charCodeAt(0).toString(16))
