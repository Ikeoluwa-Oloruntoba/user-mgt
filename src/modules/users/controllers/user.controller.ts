import 'reflect-metadata';
import { autoInjectable } from 'tsyringe';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ValidateArgs } from '../../../decorators/validateArgs';
import { UserService } from '../services/user.service';

@autoInjectable()
export class UserController {

  constructor(private userService?: UserService) {}

  async getUsers(pageNumber: number, pageSize: number) {
    return await this.userService?.getUsers(pageNumber, pageSize);
  }

  async getUserById(id: string) {
    return await this.userService?.getUserById(id);
  }

  @ValidateArgs('dto')
  async createUser(dto: CreateUserDto ) {

    return await this.userService?.createUser(dto.name, dto.email);
  }

  async getUsersCount() {
    return await this.userService?.getUsersCount();
  }
}