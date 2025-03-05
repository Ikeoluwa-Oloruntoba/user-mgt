import 'reflect-metadata';
import { AddressController } from '../src/modules/addresses/controllers/address.controller';
import { AddressService } from '../src/modules/addresses/services/address.service';
import { CreateAddressDto } from '../src/modules/addresses/dtos/create-address.dto';
import { UpdateAddressDto } from '../src/modules/addresses/dtos/update-address.dto';

describe('AddressController', () => {
  let addressController: AddressController;
  let addressService: AddressService;

  const mockAddress = {
    id: '1',
    userId: '123',
    street: '123 Main St',
    city: 'Test City',
    state: 'TS',
    postalCode: '12345',
    country: 'Test Country',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    addressService = {
      getAddressByUserId: jest.fn(),
      createAddress: jest.fn(),
      updateAddress: jest.fn()
    } as any;

    addressController = new AddressController(addressService);
  });

  describe('getAddressByUserId', () => {
    it('should get address by user id', async () => {
      jest.spyOn(addressService, 'getAddressByUserId').mockResolvedValue(mockAddress);

      const result = await addressController.getAddressByUserId('123');

      expect(result).toEqual(mockAddress);
      expect(addressService.getAddressByUserId).toHaveBeenCalledWith('123');
    });
  });

  describe('createAddress', () => {
    it('should create new address', async () => {
      const createDto: CreateAddressDto = {
        street: '123 Main St',
        city: 'Test City',
        state: 'TS',
        postalCode: '12345',
        country: 'Test Country'
      };

      jest.spyOn(addressService, 'createAddress').mockResolvedValue(mockAddress);

      const result = await addressController.createAddress('123', createDto);

      expect(result).toEqual(mockAddress);
      expect(addressService.createAddress).toHaveBeenCalledWith('123', createDto);
    });
  });

  describe('updateAddress', () => {
    it('should update address', async () => {
      const updateDto: UpdateAddressDto = {
        street: '123 Main St',
        city: 'Test City',
        state: 'TS',
        postalCode: '12345',
        country: 'Test Country'
      };

      jest.spyOn(addressService, 'updateAddress').mockResolvedValue(mockAddress);

      const result = await addressController.updateAddress('123', updateDto);

      expect(result).toEqual(mockAddress);
      expect(addressService.updateAddress).toHaveBeenCalledWith('123', updateDto);
    });
  });
}); 