import process from 'node:process'
import { beforeEach, describe, it } from 'node:test'

import {deleteEmails, getEmails } from '../lib/index.js'
import defaultEmailMessage from './_helpers/default-email-message.js'
import sendEmail from './_helpers/send-email.js'

describe('getEmails', async () => {

  beforeEach(async () => {
    await deleteEmails({
      baseUrl: 'http://localhost:4566/'
    })
  })

  it('should return with empty arrays if no emails', async ({ assert }) => {
    const emails = await getEmails({
      baseUrl: 'http://localhost:4566/'
    })

    assert.deepStrictEqual(emails, [])
  })

  it('should return with the sent email', async ({ assert }) => {
    await sendEmail()

    const emails = await getEmails({
      baseUrl: 'http://localhost:4566/'
    })

    assert.deepStrictEqual(emails.length, 1)
    const email = emails[0]
    assert.ok(email.Id)
    assert.deepStrictEqual(email.Body, {
      text_part: 'txt message',
      html_part: '<html lang="en"><head></head><body>HTML message</body></html>'
    })
    assert.deepStrictEqual(email.Destination, {
      ToAddresses: [
        'to@example.com',
      ],
    })
    assert.deepStrictEqual(email.Source, process.env.AWS_SES_FROM_EMAIL_ADDRESS)
    assert.deepStrictEqual(email.Subject, 'Test email')
    assert.ok(email.Timestamp instanceof Date)
  })

  it('should query email by id', async ({assert}) => {
    await sendEmail()
    const message2 = defaultEmailMessage()
    message2.Message.Body.Text.Data = 'Hello World!'
    await sendEmail(message2)

    const messages = await getEmails({baseUrl: 'http://localhost:4566/'})
    const firstMessage = messages[0]

    const messagesById = await getEmails({baseUrl: 'http://localhost:4566/', id: firstMessage.Id})

    assert.deepStrictEqual(firstMessage, messagesById[0])
  })

  it('should query email by sender', async ({assert}) => {
    await sendEmail()
    const message2 = defaultEmailMessage()
    message2.Source = process.env.AWS_SES_FROM_EMAIL_ADDRESS2
    await sendEmail(message2)

    const messagesBySource = await getEmails({baseUrl: 'http://localhost:4566/', source: message2.Source})

    assert.deepStrictEqual(messagesBySource[0].Source, message2.Source,)
  })
})
