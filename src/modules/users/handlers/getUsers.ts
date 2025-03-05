import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { response } from '../../../utils/response';
import { UserController } from '../controllers/user.controller';

export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {

        const pageNumber = parseInt(event.queryStringParameters?.pageNumber || '0');
        const pageSize = parseInt(event.queryStringParameters?.pageSize || '10');
        const users = await new UserController().getUsers(pageNumber, pageSize);

        return response.success('User fetched successfully', users);

    } catch (error: any) {
      
        return response.error('Failed to fetch users', error);
    }
}
  