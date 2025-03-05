import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';
import { UserService } from '../../users/services/user.service';

@injectable()
export class PostService {
  private prisma: PrismaClient;

  constructor(private userService?: UserService) {
    this.prisma = new PrismaClient();
  }

  async getPostsByUserId(userId: string) {
    const checkUserExists = await this.userService?.checkUserExists(userId);
    if(!checkUserExists) throw new Error('User does not exist')
    
    return await this.prisma.post.findMany({
      where: { userId },
    });
  }

  async createPost(title: string, body: string, userId: string) {
    const checkUserExists = await this.userService?.checkUserExists(userId);
    if(!checkUserExists) throw new Error('User does not exist')

    return await this.prisma.post.create({
      data: { title, body, userId },
    });
  }

  async deletePost(id: string) {
    return await this.prisma.post.delete({
      where: { id },
    });
  }
}