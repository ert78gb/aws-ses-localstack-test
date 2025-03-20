import process from 'node:process'
import { beforeEach, describe, it } from 'node:test'

import { deleteEmails, getEmails } from '../lib/index.js'
import defaultEmailMessage from './_helpers/default-email-message.js'
import sendEmail from './_helpers/send-email.js'

describe('deleteEmails', async () => {
  beforeEach(async () => {
    await deleteEmails({
      baseUrl: 'http://localhost:4566/'
    })

    await sendEmail()
    const message2 = defaultEmailMessage()
    message2.Source = process.env.AWS_SES_FROM_EMAIL_ADDRESS2
    await sendEmail(message2)
  })

  it('should delete all emails', async ({assert}) => {
    await deleteEmails({
      baseUrl: 'http://localhost:4566/'
    })

    const messages = await getEmails({baseUrl: 'http://localhost:4566/'})

    assert.deepStrictEqual(messages, [])
  })

  it ('should delete email by id', async ({assert}) => {
    const messages = await getEmails({baseUrl: 'http://localhost:4566/'})

    await deleteEmails({
      baseUrl: 'http://localhost:4566/',
      id: messages[0].Id,
    })

    const messages2 = await getEmails({baseUrl: 'http://localhost:4566/'})
    assert.deepStrictEqual(messages2, [messages[1]])
  })
})
