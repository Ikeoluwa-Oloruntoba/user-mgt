import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { response } from '../../../utils/response';
import { UserController } from '../controllers/user.controller';

export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {

        const userId = event.pathParameters?.id;
        if (!userId) return response.error('User ID is required');
    
        const user = await new UserController().getUserById(userId)

        return response.success('User fetched successfully', user);

    } catch (error: any) {
      
        return response.error('Failed to fetch user', error);
    }
}
  