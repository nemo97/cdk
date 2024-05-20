import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import * as codeBuild from 'aws-cdk-lib/aws-codebuild';
import { PipelineAppStage } from './pipeline-app-stage';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });


    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'api-pipeline',
      codeBuildDefaults : {
        buildEnvironment : {
          buildImage : codeBuild.LinuxBuildImage.STANDARD_7_0
        },
        partialBuildSpec : codeBuild.BuildSpec.fromObject({
          phases: {
            install: {              
              //commands: ["cd GemsOpsSpanApiLambda/", "pip3 install -r requirements.txt"],
            },
            pre_build: {
              //commands: ["cd GemsOpsSpanApiLambda","mvn test", "cd .."],
            },
          },
          reports: {
//             pytest_reports: {
//               files: ["**/*.xml"],
//               "file-format": "JUNITXML",
//               "base-directory": "GemsOpsSpanApiLambda/target/surefire-reports",
//             },
          },
        }),
      },
      synth: new ShellStep('Synth', {                
        input: CodePipelineSource.gitHub('nemo97/cdk', 'master', { authentication : cdk.SecretValue.secretsManager('MyCDK_auth')}),        
        installCommands: ['update-java-alternatives --set  /usr/lib/jvm/java-21-amazon-corretto'],
        commands: ['ls -ltr','npm ci', 'npx cdk synth'],
        primaryOutputDirectory : 'cdk.out',         
      }),        
      crossAccountKeys : true    
    });
    

    const testingStage = pipeline.addStage(new PipelineAppStage(this, 'YahooLab',{
      env: props?.env
    }));

    const testingStage1 = pipeline.addStage(new PipelineAppStage(this, 'GmailLab',{
      env: { account: '253395429738'}
    }));
  }
}
