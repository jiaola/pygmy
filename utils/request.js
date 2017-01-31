/**
 * @private
 * @function request
 * @description Make a request to the server and return a promise. From https://github.com/pburtchaell/redux-promise-middleware/
 * @param {string} url
 * @param {object} options
 * @returns {promise}
 */
export default function request(url, options) {
  return new Promise((resolve, reject) => {
    if (!url) reject(new Error('URL parameter required'));
    if (!options) reject(new Error('Options parameter required'));

    fetch(url, options)
      .then(response => {
        if (!response.ok) reject(response.statusText)
        return response.json()
      })
      .then(response => {
        if (response.errors) {
          reject(response.errors);
        }
        else resolve(response);
      })
      .catch(reject);
  });
}
