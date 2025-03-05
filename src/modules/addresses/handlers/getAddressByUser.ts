

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { response } from '../../../utils/response';
import { AddressController } from '../controllers/address.controller';

export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {

      const userId = event.pathParameters?.userId;

      if (!userId) return response.error('User ID is required');
  
      const result = await new AddressController().getAddressByUserId(userId);
  
      return response.success('User Address fetched successfully', result);
    } catch (error: any) {
      
      return response.error('Failed to fetch address', error);
    }
}