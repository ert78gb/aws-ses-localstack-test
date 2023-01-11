import { readdir, rm, stat } from 'fs/promises'
import { exists } from 'node:fs'
import { promisify } from 'node:util'
import { userInfo } from 'os'
import { join } from 'path'
import chmodr from 'chmodr'
import chownr from 'chownr'

import getSesDirectory from './get-ses-directory.js'

const existsAsync = promisify(exists)

const chmodrAsync = (pathLike, mode) => new Promise((resolve, reject) => {
  chmodr(pathLike, mode, (error) => {
    if(error)
      return reject(error)

    resolve()
  })
})
const chownrAsync =(pathLike, uid, guid) => new Promise((resolve, reject) => {
  chownr(pathLike, uid, guid, (error) => {
    if(error)
      return reject(error)

    resolve()
  })
})

/**
 * Delete localstack emails
 * @param {string} directory Locally mounted folder of /var/lib/localstack
 */
export default async function deleteEmails({directory}){
  const sesDirectory = getSesDirectory(directory)
  if (!await existsAsync(sesDirectory))
    return

  const user = userInfo()

  await chownrAsync(sesDirectory, user.uid, user.gid)
  await chmodrAsync(sesDirectory, 0o777)

  const entries = await readdir(sesDirectory)

  for(const entry of entries) {
    const filePath = join(sesDirectory, entry)
    const info = await stat(filePath)

    await rm(filePath, {recursive: info.isDirectory()})
  }

}
