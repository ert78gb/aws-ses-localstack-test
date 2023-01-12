import { test } from 'tap'
import { deleteEmails, getEmails } from '../lib/index.js'
import getLocalstackDirectory from './_helpers/get-localstack-directory.js'

import sendEmail from './_helpers/send-email.js'

test('should delete emails', async ({strictSame}) => {
  await sendEmail()

  await deleteEmails({
    directory: getLocalstackDirectory()
  })

  const emails = await getEmails({
    directory: getLocalstackDirectory()
  })

  strictSame(emails, [])
})
