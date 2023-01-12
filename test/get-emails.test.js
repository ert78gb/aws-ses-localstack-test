import { test } from 'tap'

import {deleteEmails, getEmails } from '../lib/index.js'
import getLocalstackDirectory from './_helpers/get-localstack-directory.js'
import sendEmail from './_helpers/send-email.js'

test('getEmails', async t => {

  t.beforeEach(async () => {
    await deleteEmails({
      directory: getLocalstackDirectory()
    })
  })

  t.test('should return with empty arrays if no emails', async ({ strictSame }) => {
    const emails = await getEmails({
      directory: getLocalstackDirectory()
    })

    strictSame(emails, [])
  })

  t.test('should return with the sent email', async ({ ok, strictSame, type }) => {
    await sendEmail()

    const emails = await getEmails({
      directory: getLocalstackDirectory()
    })

    strictSame(emails.length, 1)
    const email = emails[0]
    ok(email.Id)
    strictSame(email.Body, {
      text_part: 'txt message',
      html_part: '<html lang="en"><head></head><body>HTML message</body></html>'
    })
    strictSame(email.Destination, {
      ToAddresses: [
        'to@example.com',
      ],
    })
    strictSame(email.Source, process.env.AWS_SES_FROM_EMAIL_ADDRESS)
    strictSame(email.Subject, 'Test email')
    type(email.Timestamp, Date)
  })

})
