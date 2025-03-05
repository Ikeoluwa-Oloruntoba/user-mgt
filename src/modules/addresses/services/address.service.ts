import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';
import { UserService } from '../../users/services/user.service';
import { UpdateAddressDto } from '../dtos/update-address.dto';
import { CreateAddressDto } from '../dtos/create-address.dto';

@injectable()
export class AddressService {
  private prisma: PrismaClient;

  constructor(private userService?: UserService) {
    this.prisma = new PrismaClient();
  }

  async getAddressByUserId(userId: string) {
    const checkUserExists = await this.userService?.checkUserExists(userId);
    if(!checkUserExists) throw new Error('User does not exist');

    return await this.prisma.address.findUnique({
      where: { userId },
    });
  }

  async createAddress(userId: string, createAddressDto: CreateAddressDto) {
    const checkUserExists = await this.userService?.checkUserExists(userId);
    if(!checkUserExists) throw new Error('User does not exist');

    // Check if user already has an address
    const existingAddress = await this.prisma.address.findUnique({
      where: { userId },
    });
    if(existingAddress) throw new Error('User already has an address');

    return await this.prisma.address.create({
      data: {
        userId,
        street: createAddressDto.street,
        city: createAddressDto.city,
        state: createAddressDto.state,
        postalCode: createAddressDto.postalCode,
        country: createAddressDto.country
      },
    });
  }

  async updateAddress(userId: string, updateAddressDto: UpdateAddressDto) {
    const checkUserExists = await this.userService?.checkUserExists(userId);
    if(!checkUserExists) throw new Error('User does not exist');

    return await this.prisma.address.update({
      where: { userId },
      data: {
        street: updateAddressDto.street,
        city: updateAddressDto.city,
        state: updateAddressDto.state,
        postalCode: updateAddressDto.postalCode,
        country: updateAddressDto.country
      },
    });
  }
}