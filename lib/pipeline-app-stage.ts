import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {lamdaStack} from './lamda-stack';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class PipelineAppStage extends cdk.Stage {

    constructor(scope: Construct, id: string, props?: cdk.StageProps){
        super(scope, id, props);
        const awscicdlamdaStack = new lamdaStack(this,'LamdaStack')
        const hcEndpoint = awscicdlamdaStack.hcEndpoint;
//
        console.log("hcEndpoint",hcEndpoint);
    }
}