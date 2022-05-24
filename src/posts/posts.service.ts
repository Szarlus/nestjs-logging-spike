import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: { [key: Post['id']]: Post } = {};

  create(createPostDto: CreatePostDto) {
    const id: Post['id'] = uuid();

    const post: Post = {
      id,
      ...createPostDto,
    };

    this.posts[id] = post;

    return post;
  }

  findAll() {
    return Object.values(this.posts);
  }

  findOne(id: string) {
    return this.posts[id];
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    const post = this.posts[id];

    Object.assign(post, updatePostDto);

    return post;
  }

  remove(id: string) {
    return (this.posts[id] = undefined);
  }
}
