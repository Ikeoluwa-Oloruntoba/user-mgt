import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { response } from '../../../utils/response';
import { UserController } from '../controllers/user.controller';

export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {

        const count = await new UserController().getUsersCount()

        return response.success('User Count Fetched successfully', count);

    } catch (error: any) {
      
        return response.error('Failed to fetch user count', error);
    }
}
  