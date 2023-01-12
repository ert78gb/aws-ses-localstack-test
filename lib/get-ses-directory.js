import {join} from 'path'
export default function getSesDirectory(localstackDirectory) {
  return join(localstackDirectory, 'tmp', 'state', 'ses')
}
