import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as lambda from 'aws-cdk-lib/aws-lambda'

export function createSnsPowerRoleForLambda(scope: Construct, constructId: string) {
    const role = new iam.Role(scope, constructId, {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    })
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'))
    role.addToPolicy(new iam.PolicyStatement({ actions: ['sns:*'], resources: ['*'] }))

    return role
}

export function createLambdaInvokeRoleForScheduler(
    scope: Construct,
    constructId: string,
    lambdaFunction: lambda.Function
) {
    const role = new iam.Role(scope, constructId, {
        assumedBy: new iam.ServicePrincipal('scheduler.amazonaws.com'),
    })

    role.addToPolicy(
        new iam.PolicyStatement({ actions: ['lambda:InvokeFunction'], resources: [lambdaFunction.functionArn] })
    )

    return role
}
