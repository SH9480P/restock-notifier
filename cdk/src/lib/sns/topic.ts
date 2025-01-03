import { Construct } from 'constructs'
import * as sns from 'aws-cdk-lib/aws-sns'
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions'

export function createTopicAndSubscribeEmail(scope: Construct, constructId: string) {
    const topic = new sns.Topic(scope, constructId)

    const emailAddress = process.env.EMAIL_ADDRESS
    if (emailAddress === undefined) {
        throw new Error('EMAIL_ADDRESS does not exist on env')
    }

    topic.addSubscription(new subscriptions.EmailSubscription(emailAddress))

    return topic
}
