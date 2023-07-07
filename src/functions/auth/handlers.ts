import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { v4 } from "uuid";

import { userService } from "../../service";

const signUp = middyfy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try {
            const id = v4();
            const body = JSON.stringify(event.body);
            const signUp = await userService.signUp({
                userId: id,
                name: JSON.parse(body).name,
                phone: JSON.parse(body).phone,
                address: JSON.parse(body).name,
                createdAt: new Date().toISOString(),
            });

            return formatJSONResponse({
                signUp,
            });
        } catch (error) {
            return formatJSONResponse({
                status: 500,
                data: error,
            });
        }
    }
);

export { signUp };
