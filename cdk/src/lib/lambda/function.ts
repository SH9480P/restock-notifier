import { Construct } from 'constructs'
import { Duration } from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as iam from 'aws-cdk-lib/aws-iam'

export function createNotifierFunction(scope: Construct, constructId: string, role: iam.Role, topicArn: string) {
    const chromiumMajorVersion = process.env.CHROMIUM_MAJOR_VERSION_FAKE
    if (chromiumMajorVersion === undefined) {
        throw new Error('CHROMIUM_MAJOR_VERSION_FAKE does not exist on env')
    }

    return new lambda.Function(scope, constructId, {
        runtime: lambda.Runtime.NODEJS_22_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset('../app/dist/archive.zip'),
        memorySize: 1800,
        timeout: Duration.seconds(30),
        role: role,
        environment: {
            TOPIC_ARN: topicArn,
            CHROMIUM_MAJOR_VERSION_FAKE: chromiumMajorVersion,
        },
    })
}
