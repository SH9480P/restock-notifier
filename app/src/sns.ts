import { PublishCommand, SNSClient } from '@aws-sdk/client-sns'
import { fromEnv } from '@aws-sdk/credential-providers'

const snsClient = new SNSClient({ region: process.env.AWS_REGION, credentials: fromEnv() })
const command = new PublishCommand({
    TopicArn: 'arn:aws:sns:ap-northeast-2:211125585858:InStock',
    Message: 'Khaki L Size In Stock',
})

export const sendEmail = async () => {
    return await snsClient.send(command)
}
