#!/bin/bash
set -eo pipefail

# Set witch email address allowed as sender.
# Mount this file under the /etc/localstack/init/ready.d/ folder in the localstack image

aws ses verify-email-identity --email-address ${SES_FROM_EMAIL_ADDRESS} --region ${AWS_REGION} --endpoint-url=http://localhost:4566
echo "Verified SES email sender: ${SES_FROM_EMAIL_ADDRESS}"
