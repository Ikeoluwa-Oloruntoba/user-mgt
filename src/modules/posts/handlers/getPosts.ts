import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { response } from '../../../utils/response';
import { CreatePostDto } from '../dtos/post.dto';
import { PostController } from '../controllers/post.controller';

export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
        const userId = event.queryStringParameters?.userId;

        if (!userId) return response.error('User ID is required');
    
        const result = await new PostController().getPostsByUserId(userId);
    
        return response.success('Post fetched successfully', result);
    } catch (error: any) {
      
      return response.error('Failed to fetch post', error);
    }
}