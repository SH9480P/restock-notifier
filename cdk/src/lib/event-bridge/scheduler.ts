import { Construct } from 'constructs'
import * as scheduler from 'aws-cdk-lib/aws-scheduler'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as iam from 'aws-cdk-lib/aws-iam'

export function createScheduler(
    scope: Construct,
    constructId: string,
    lambdaFunction: lambda.Function,
    role: iam.Role
) {
    return new scheduler.CfnSchedule(scope, constructId, {
        flexibleTimeWindow: {
            mode: 'OFF',
        },
        scheduleExpression: 'cron(0 * * * ? *)',
        scheduleExpressionTimezone: 'Asia/Seoul',
        state: 'DISABLED',
        target: {
            arn: lambdaFunction.functionArn,
            retryPolicy: {
                maximumRetryAttempts: 3,
                maximumEventAgeInSeconds: 60,
            },
            roleArn: role.roleArn,
        },
    })
}
