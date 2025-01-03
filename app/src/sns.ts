import { PublishCommand, SNSClient } from '@aws-sdk/client-sns'
import { fromEnv } from '@aws-sdk/credential-providers'

const snsClient = new SNSClient({ region: process.env.AWS_REGION, credentials: fromEnv() })

const topicArn = process.env.TOPIC_ARN
if (topicArn === undefined) {
    throw new Error('TOPIC_ARN does not exist on env')
}

const command = new PublishCommand({
    TopicArn: topicArn,
    Message: 'Your Item Is In Stock',
})

export const sendEmail = async () => {
    return await snsClient.send(command)
}
