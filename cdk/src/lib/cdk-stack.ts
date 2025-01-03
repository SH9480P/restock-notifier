import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { createTopicAndSubscribeEmail } from './sns/topic'
import { createLambdaInvokeRoleForScheduler, createSnsPowerRoleForLambda } from './iam/role'
import { createNotifierFunction } from './lambda/function'
import { createScheduler } from './event-bridge/scheduler'

export class CdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        // 토픽 만들고 구독하기
        const topic = createTopicAndSubscribeEmail(this, 'InStockTopic')

        // SNS Power User Role 만들기
        const roleForLambda = createSnsPowerRoleForLambda(this, 'SnsFullAccessLambdaRole')

        // Lambda Function 만들기
        const lambdaFunction = createNotifierFunction(this, 'NotifierFunction', roleForLambda, topic.topicArn)

        // Lambda Invoke Role 만들기
        const roleForScheduler = createLambdaInvokeRoleForScheduler(
            this,
            'NotifierFunctionInvokeRoleForScheduler',
            lambdaFunction
        )

        // scheduler 만들기
        createScheduler(this, 'NotifierStartScheduler', lambdaFunction, roleForScheduler)
    }
}
