import {SES} from '@aws-sdk/client-ses'
export default async function sendEmail(){
  const client = new SES({
    credentials: {
      accessKeyId: '',
      secretAccessKey: '',
    },
    endpoint: process.env.AWS_SES_ENDPOINT,
    region: process.env.AWS_SES_REGION,
  })

  return client.sendEmail({
    Destination: {
      ToAddresses: ['to@example.com'],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: 'txt message',
        },
        Html: {
          Charset: 'UTF-8',
          Data: '<html lang="en"><head></head><body>HTML message</body></html>',
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test email',
      },
    },
    Source: process.env.AWS_SES_FROM_EMAIL_ADDRESS
  })
}
