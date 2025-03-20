import {SES} from '@aws-sdk/client-ses'

import defaultEmailMessage from './default-email-message.js'

export default async function sendEmail(message = defaultEmailMessage()){
  const client = new SES({
    credentials: {
      accessKeyId: '',
      secretAccessKey: '',
    },
    endpoint: process.env.AWS_SES_ENDPOINT,
    region: process.env.AWS_SES_REGION,
  })

  return client.sendEmail(message)
}
