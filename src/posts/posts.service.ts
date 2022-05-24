import { v4 as uuid } from 'uuid';
import { Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: { [key: Post['id']]: Post } = {};

  private readonly logger = new Logger(PostsService.name);

  // Can be injected and set throught Pino's decorator, won't be lib-agnostic tho
  // constructor(
  //   @InjectPinoLogger(PostsService.name)
  //   private readonly logger: PinoLogger,
  // ) {}

  create(createPostDto: CreatePostDto) {
    this.logger.log('Creating post with data %o', createPostDto);

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
