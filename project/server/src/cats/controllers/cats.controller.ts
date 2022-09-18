import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from '../../common/pipes/positivelnt.pipe';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import { CatsService } from '../services/cats.service';
import { SuccessInterceptor } from '../../common/interceptors/success.interceptor';
import { CatRequestDto } from '../dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCat } from '../dto/cat.dto';
import { AuthService } from '../../auth/auth.service';
import { LoginRequestDto } from '../../auth/dto/login.request';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/utils/multer.options';
import { Cat } from '../cats.schema';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard) // 인증 처리
  @ApiOperation({ summary: '현재 고양이 가져오기' })
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  @Post()
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 200, description: '성공', type: ReadOnlyCat })
  async signUp(@Body() body: CatRequestDto) {
    console.log('body: ', body);
    return await this.catsService.signup(body);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  logIn(@Body() data: LoginRequestDto) {
    Logger.log('로그인 요청...', data);
    return this.authService.jwtLogIn(data);
  }

  @Post('upload')
  @ApiOperation({ summary: '고양이 사진 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    console.log(files);
    // return { image: `http://localhost:8000/media/cats/${files[0].filename}` };
    return this.catsService.uploadImg(cat, files);
  }
}
