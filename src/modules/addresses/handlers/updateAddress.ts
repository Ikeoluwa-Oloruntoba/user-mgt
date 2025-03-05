

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { response } from '../../../utils/response';
import { CreateAddressDto } from '../dtos/create-address.dto';
import { AddressController } from '../controllers/address.controller';
import { UpdateAddressDto } from '../dtos/update-address.dto';

export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const body = JSON.parse(event.body || '{}');
      const dto = Object.assign(new UpdateAddressDto(), body);

      const userId = event.pathParameters?.userId;

      if (!userId) return response.error('Address ID is required');
  
      const result = await new AddressController().updateAddress(userId, dto);
  
      return response.success('Address Updated successfully', result);
    } catch (error: any) {
      
      return response.error('Failed to update address', error);
    }
}