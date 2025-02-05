import { APIGatewayProxyResult } from "aws-lambda";
import { HttpStatusCode, AxiosError } from "axios";

export const response = {
    success: (
        message: string,
        data?: any,
        statusCode?: number
    ): APIGatewayProxyResult => {
        return {
            headers: { "Content-Type": "application/json" },
            statusCode: statusCode ?? HttpStatusCode.Ok,
            body: JSON.stringify({ message, data }),
        };
    },

    error: (
        message: string,
        errors?: any | AxiosError,
        statusCode?: number
    ): APIGatewayProxyResult => {
        if (errors?.response) {
            return {
                headers: { "Content-Type": "application/json" },
                statusCode: errors?.response.status,
                body: JSON.stringify({ message: errors?.response.statusText }),
            };
        } else {
            return {
                headers: { "Content-Type": "application/json" },
                statusCode: statusCode ?? HttpStatusCode.BadRequest,
                body: JSON.stringify({ message, ...{ errors } }),
            };
        }
    },
};