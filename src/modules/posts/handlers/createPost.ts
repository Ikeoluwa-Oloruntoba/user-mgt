import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { response } from '../../../utils/response';
import { CreatePostDto } from '../dtos/post.dto';
import { PostController } from '../controllers/post.controller';

export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const body = JSON.parse(event.body || '{}');
      const dto = Object.assign(new CreatePostDto(), body);
  
      const result = await new PostController().createPost(dto);
  
      return response.success('Post created successfully', result);
    } catch (error: any) {
      
      return response.error('Failed to create post', error);
    }
}