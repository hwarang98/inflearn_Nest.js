import { Injectable, Logger } from '@nestjs/common';
import { CommnetsCreateDto } from '../dto/comments.create.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 'all comments';
  }
  async createComment(id: string, commnets: CommnetsCreateDto) {
    Logger.log(commnets);
    return `id: ${id}, commnets: [${commnets.author}, ${commnets.contents}]`;
  }

  async plustLike(id: string) {
    return '좋아요수 올리기';
  }
}
