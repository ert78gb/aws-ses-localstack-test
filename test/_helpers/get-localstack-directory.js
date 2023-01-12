import {join} from 'desm'

export default function getLocalstackDirectory(){
  return join(import.meta.url, '..', '_localstack-volume')
}
