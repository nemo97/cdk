# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

`
aws iam create-policy \
  --policy-name cdkExecutionPolicy \
  --policy-document file://cdkExecutionPolicy.json

-- update 

aws iam create-policy-version \
  --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/cdkCFExecutionPolicy \
  --policy-document file://cdkExecutionPolicy.json \
  --set-as-default

`

arn:aws:iam::253395429738:policy/cdkExecutionPolicy

cdk bootstrap aws://253395429738/us-west-2 --trust 006821319920 --trust-for-lookup 006821319920 --cloudformation-execution-policies "arn:aws:iam::253395429738:policy/cdkExecutionPolicy" --profile gmail

aws iam create-policy-version --policy-arn arn:aws:iam::253395429738:policy/cdkExecutionPolicy --policy-document file://cdkExecutionPolicy.json --set-as-default --profile gmail