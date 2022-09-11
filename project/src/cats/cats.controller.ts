import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from '../common/pipes/positivelnt.pipe';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @ApiOperation({ summary: '현재 고양이 가져오기' })
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 200, description: '성공' })
  async signUp(@Body() body: CatRequestDto) {
    console.log('body: ', body);
    return await this.catsService.signup(body);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  logIn() {
    return 'signup';
  }

  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  @ApiOperation({ summary: '고양이 사진 업로드' })
  uploadCatImg() {
    return 'uploadImg';
  }
}
