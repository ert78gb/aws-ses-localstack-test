AWS SES Localstack test util
============================

This package provides the following methods to help with integration or e2e tests
- `getEmails` returns with all emails from the localstack mounted volumes
- `deleteEmails` deletes all emails from the localstack mounted volumes

## How to use

Query all emails. 

```javascript
import { getEmails } from '@ert78gb/aws-ses-localstack-test'

const sentEmails = getEmails({
  baseUrl: 'http://localhost:4566/', // URI of the localstack instance
})
```

Query emails by id. Logically should return only 1 email, but who knows, so the result is an array

```javascript
import { getEmails } from '@ert78gb/aws-ses-localstack-test'

const sentEmails = getEmails({baseUrl: 'http://localhost:4566/', id: 'message-id'})
```

Query emails by sender/source

```javascript
import { getEmails } from '@ert78gb/aws-ses-localstack-test'

const sentEmails = getEmails({baseUrl: 'http://localhost:4566/', source: 'email@example.com'})
```

Sent email structure. Uses the original property names as localstack generates the json files

```typescript
interface LocalstackEmail {
  Id: string;
  Region: string;
  Destination: {
    BccAddresses?: string[];
    CcAddresses?: string[];
    ToAddresses?: string[];
  },
  Source: string;
  Subject: string;
  Body: {
    text_part: string;
    html_part: string;
  },
  Timestamp: Date;
}
```
Delete all emails

```javascript
import { deleteEmails } from '@ert78gb/aws-ses-localstack-test'

const sentEmails = deleteEmails({baseUrl: 'http://localhost:4566/'})
```

Delete email by id

```javascript
import { deleteEmails } from '@ert78gb/aws-ses-localstack-test'

const sentEmails = deleteEmails({baseUrl: 'http://localhost:4566/', id: 'message-id'})
```
