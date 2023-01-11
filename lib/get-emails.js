import {exists} from 'node:fs'
import {join} from 'node:path'
import {promisify} from 'node:util'
import {readdir, readFile, stat} from 'node:fs/promises'
import {setTimeout} from 'node:timers/promises'
import getSesDirectory from './get-ses-directory.js'

const existAsync = promisify(exists)

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
 * @property {string} Subject
 * @property {Date} Timestamp
 */

/**
 * Returns with the stored emails
 * @param {string} directory Locally mounted folder of /var/lib/localstack
 * @param {number} [wait=1000] There is a delay before the files will visible in the mounted volume
 * @returns {Promise<LocalstackEmail[]>}
 */
export default async function getEmails({directory, wait = 1000}) {
  await setTimeout(wait)

  const sesDirectory = getSesDirectory(directory)

  if(!await existAsync(sesDirectory))
    return []

  const entities = await readdir(sesDirectory)
  const result = []

  for (const entity of entities) {
    const entityPath = join(sesDirectory, entity)
    const info = await stat(entityPath)

    if (info.isDirectory())
      continue

    const content = await readFile(entityPath, {encoding: 'utf8'})
    result.push(JSON.parse(content, (key, value) => {
      if (key === 'Timestamp')
        return new Date(value)

      return value
    }))
  }

  return result
}
