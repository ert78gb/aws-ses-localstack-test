import process from 'node:process'

/**
 * @returns {import('@aws-sdk/client-ses').SendEmailCommandInput}
 */
export default function defaultEmailMessage() {
  return {
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
  }
}
