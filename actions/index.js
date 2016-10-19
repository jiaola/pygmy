export const ADD_CHAR = 'ADD_CHAR'
export const DELETE_CHAR = 'DELETE_CHAR'

export function addChar(character){
  return {
    type: ADD_CHAR,
    character
  }
}

export function deleteChar(index){
  return {
    type: DELETE_CHAR,
    index
  }
}
