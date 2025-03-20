#!/bin/bash
set -eo pipefail

# Set witch email address allowed as sender.
# Mount this file under the /etc/localstack/init/ready.d/ folder in the localstack image
awslocal ses verify-email-identity --email ${SES_FROM_EMAIL_ADDRESS} --region ${AWS_REGION}
echo "Verified SES email sender: ${SES_FROM_EMAIL_ADDRESS}"

awslocal ses verify-email-identity --email ${SES_FROM_EMAIL_ADDRESS2} --region ${AWS_REGION}
echo "Verified SES email sender: ${SES_FROM_EMAIL_ADDRESS2}"
