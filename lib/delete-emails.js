import { readdir, rm, stat } from 'fs/promises'
import { exists } from 'fs'
import { promisify } from 'util'
import { join } from 'path'
import { userInfo } from 'os'
import chmodr from 'chmodr'
import chownr from 'chownr'

import getSesDirectory from './get-ses-directory.js'

const existsAsync = promisify(exists)
const chmodrAsync = promisify(chmodr)
const chownrAsync = promisify(chownr)
/**
 * Delete localstack emails
 * @param {string} directory Locally mounted folder of /var/lib/localstack
 */
export default async function deleteEmails({directory}){
  const sesDirectory = getSesDirectory(directory)
  if (!await existsAsync(sesDirectory))
    return

  const user = userInfo()

  await chownrAsync(directory, user.uid, user.gid)
  await chmodrAsync(directory, 0o764)

  const entries = await readdir(sesDirectory)

  for(const entry of entries) {
    const filePath = join(sesDirectory, entry)
    const info = await stat(filePath)

    await rm(filePath, {recursive: info.isDirectory()})
  }

}
