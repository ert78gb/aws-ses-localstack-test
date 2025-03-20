import parseFetchResponse from './parse-fetch-response.js'

/**
 * Delete localstack emails
 * @param {string} baseUrl - Localstack service base url like http://localhost:4566
 * @param {string} [id] - Delete emails by message id
 */
export default async function deleteEmails({baseUrl, id}){
  const url = new URL('/_aws/ses', baseUrl)

  if (id) {
    url.searchParams.set('id', id)
  }

  const response = await fetch(url, {
    method: 'DELETE',
  })

  return parseFetchResponse(response)
}
