import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { prepareLogger } from './common/prepare-logger';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PostsModule, prepareLogger()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
