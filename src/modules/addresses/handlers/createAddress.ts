import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { response } from '../../../utils/response';
import { CreateAddressDto } from '../dtos/create-address.dto';
import { AddressController } from '../controllers/address.controller';
import { plainToInstance } from 'class-transformer';

export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const body = JSON.parse(event.body || '{}');
      const dto = plainToInstance(CreateAddressDto, body);

      const userId = event.pathParameters?.userId;

      if (!userId) return response.error('User ID is required');
  
      const result = await new AddressController().createAddress(userId, dto);
  
      return response.success('Address created successfully', result);
    } catch (error: any) {
      
      return response.error('Failed to create address', error);
    }
}