import parseFetchResponse from './parse-fetch-response.js'

/**
 * @typedef {Object} LocalstackEmailBody
 * @property {string} text_part
 * @property {string} html_part
 */

/**
 * @typedef {Object} LocalstackEmail
 * @property {LocalstackEmailBody} Body
 * @property {import('@aws-sdk/client-ses').Destination} Destination
 * @property {string} Id
 * @property {string} Region
 * @property {string} Source
 * @property {string} Subject
 * @property {Date} Timestamp
 */

/**
 * Returns with the stored emails
 * @param {string} baseUrl - Localstack service base url like http://localhost:4566
 * @param {string} [id] - Query emails by message id
 * @param {string} [source] - Query emails by sender
 * @returns {Promise<LocalstackEmail[]>}
 */
export default async function getEmails({baseUrl, source, id}) {
  const url = new URL('/_aws/ses', baseUrl)

  if (source) {
    url.searchParams.set('email', source)
  }

  if (id) {
    url.searchParams.set('id', id)
  }

  const response = await fetch(url, {
    method: 'GET',
  })

  const content = await parseFetchResponse(response)
  const messages = content.messages || []

  return messages.map(message => ({
    ...message,
    Timestamp: new Date(message.Timestamp),
  }))
}
