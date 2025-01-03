import { Construct } from 'constructs'
import { Duration } from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as iam from 'aws-cdk-lib/aws-iam'

export function createNotifierFunction(scope: Construct, constructId: string, role: iam.Role, topicArn: string) {
    return new lambda.Function(scope, constructId, {
        runtime: lambda.Runtime.NODEJS_22_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset('../app/dist/archive.zip'),
        memorySize: 1800,
        timeout: Duration.seconds(30),
        role: role,
        environment: {
            TOPIC_ARN: topicArn,
        },
    })
}
