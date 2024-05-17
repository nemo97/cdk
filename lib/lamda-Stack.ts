import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
// import {aws_logs} from "aws-cdk-lib";

interface MultiStackProps extends cdk.StackProps {
    stage: string;
}

export class lamdaStack extends cdk.Stack{
    
    public readonly hcEndpoint: cdk.CfnOutput;

    constructor(scope: Construct, id: string, props?:MultiStackProps){
        super(scope, id, props);

       const hello = new lambda.Function(this, "MatsonHelloHandler",{
            runtime : lambda.Runtime.NODEJS_18_X,
            code : lambda.Code.fromAsset("lambda"),
            handler : "hello.handler"
           }) ;

        //    const gateway = new apigw.LambdaRestApi(this, "Endpoint", {
        //          handler: hello,
        //        });


        //      this.hcEndpoint = new cdk.CfnOutput(this, "GatewayUrl", {
        //          value: gateway.url,
        //        });
    
    }       
}