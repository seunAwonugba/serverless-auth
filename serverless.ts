import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import { signUp } from "@functions/auth";

const serverlessConfiguration: AWS = {
    service: "serverless",
    frameworkVersion: "3",
    // plugins: ["serverless-esbuild"],
    plugins: [
        "serverless-esbuild",
        "serverless-plugin-typescript",
        "serverless-dynamodb-local",
        "serverless-offline",
    ],

    provider: {
        name: "aws",
        runtime: "nodejs14.x",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
        },
    },
    functions: { signUp },

    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ["aws-sdk"],
            target: "node14",
            define: { "require.resolve": undefined },
            platform: "node",
            concurrency: 10,
        },

        dynamodb: {
            start: {
                port: 5000,
                inMemory: true,
                migrate: true,
            },
            stages: "dev",
        },
    },

    resources: {
        Resources: {
            usersTable: {
                Type: "AWS::DynamoDB::Table",
                Properties: {
                    TableName: "usersTable",
                    AttributeDefinitions: [
                        {
                            AttributeName: "userId",
                            AttributeType: "S",
                        },
                    ],
                    KeySchema: [
                        {
                            AttributeName: "userId",
                            KeyType: "HASH",
                        },
                    ],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 1,
                        WriteCapacityUnits: 1,
                    },
                },
            },
        },
    },
};

module.exports = serverlessConfiguration;
