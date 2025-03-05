import 'reflect-metadata';
import { autoInjectable } from "tsyringe";
import { CreatePostDto } from "../dtos/post.dto";
import { ValidateArgs } from '../../../decorators/validateArgs';
import { PostService } from '../services/post.service';

@autoInjectable()
export class PostController {

    constructor(private postService?: PostService) {}
  
    async getPostsByUserId(userId: string) {
      return await this.postService?.getPostsByUserId(userId);
    }
  
    @ValidateArgs('dto')
    async createPost(dto: CreatePostDto) {
    
      return await this.postService?.createPost(dto.title, dto.body, dto.userId);
    }
  
    async deletePost(id: string) {
      return await this.postService?.deletePost(id);
    }
}