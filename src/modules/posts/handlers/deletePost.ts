import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { response } from '../../../utils/response';
import { CreatePostDto } from '../dtos/post.dto';
import { PostController } from '../controllers/post.controller';

export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
        const postId = event.pathParameters?.id;

        if (!postId) return response.error('Post ID is required');
    
        const result = await new PostController().deletePost(postId);
    
        return response.success('Post deleted successfully', result);
    } catch (error: any) {
      
      return response.error('Failed to delete post', error);
    }
}