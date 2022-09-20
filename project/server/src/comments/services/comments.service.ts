import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 'all comments';
  }
  async createComment(id: string) {
    return `id: ${id}`;
  }
}
