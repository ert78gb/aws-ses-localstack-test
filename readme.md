AWS SES Localstack test util
============================

This package provides the following methods to help with integration or e2e tests
- `getEmails` returns with all emails from the localstack mounted volumes
- `deleteEmails` deletes all emails from the localstack mounted volumes

## How to use

- mount the `/var/lib/localstack` directory from the docker image to a local folder.
  Mount the `/var/lib/localstack` directory, because if only the `/var/lib/localstack/tmp/state/ses` has been mounted then the docker image will not start

```javascript
import {deleteEmails, getEmails } from '@ert78gb/aws-ses-localstack-test'

const localstackMounted = 'path/to/the/locally/mounted/folder/'

await deleteEmails({directory: localstackMounted})

// send email

const sentEmails = getEmails({directory: localstackMounted})
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
