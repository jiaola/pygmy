export const API_ROOT = 'http://localhost:3000'

export function fetchHandler(response) {
  if (!response.ok) throw Error(response.statusText)
  return response.json()
}
