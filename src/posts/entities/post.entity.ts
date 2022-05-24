type PostId = string & { __brand: 'PostId' };

export class Post {
  id: PostId;
  title: string;
  content: string;
}
