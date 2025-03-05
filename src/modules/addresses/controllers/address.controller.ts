import 'reflect-metadata';
import { autoInjectable, injectable } from 'tsyringe';
import { AddressService } from '../services/address.service';
import { CreateAddressDto } from '../dtos/create-address.dto';
import { UpdateAddressDto } from '../dtos/update-address.dto';
import { ValidateArgs } from '../../../decorators/validateArgs';

@autoInjectable()
export class AddressController {
  constructor(private addressService?: AddressService) {}

  async getAddressByUserId(userId: string) {
    return await this.addressService?.getAddressByUserId(userId);
  }

  @ValidateArgs('dto')
  async createAddress(userId: string, dto: CreateAddressDto) {
    return await this.addressService?.createAddress(userId, dto);
  }

  @ValidateArgs('body')
  async updateAddress(userId: string, body: UpdateAddressDto) {

    return await this.addressService?.updateAddress(userId, body);
  }
}
