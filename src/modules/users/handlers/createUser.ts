import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { response } from '../../../utils/response';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserController } from '../controllers/user.controller';

export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const body = JSON.parse(event.body || '{}');
      const dto = Object.assign(new CreateUserDto(), body);
  
      const result = await new UserController().createUser(dto);
  
      return response.success('User created successfully', result);
    } catch (error: any) {
      
      return response.error('Failed to create user', error);
    }
}
  