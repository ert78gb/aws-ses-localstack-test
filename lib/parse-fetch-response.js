/**
 * @param {Response} response
 * @returns {Promise<*>}
 */
export default async function parseFetchResponse (response) {
  const contentType = response.headers.get('content-type')
  let content

  if (contentType === 'application/json') {
    content = await response.json()
  }
  else {
    content = await response.text()
  }

  if (response.ok) {
    return content
  }

  throw new Error(`Unable to get emails from from localstack. ${content}`)
}
