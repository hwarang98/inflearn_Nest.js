import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommnetsCreateDto } from '../dto/comments.create.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commnetService: CommentsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get()
  async getAllComments() {
    return this.commnetService.getAllComments();
  }

  @ApiOperation({ summary: '특정 고양이 프로필에 댓글 남기기' })
  @Post(':id')
  async createCommnet(
    @Param('id') id: string,
    @Body() body: CommnetsCreateDto,
  ) {
    return this.commnetService.createComment(id, body);
  }

  @ApiOperation({ summary: '좋아요 수 올리기' })
  @Post(':id')
  async plusLike(@Param('id') id: string) {
    return this.commnetService.plustLike(id);
  }
}
