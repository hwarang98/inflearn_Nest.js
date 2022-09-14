import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from '../cats/cats.repository';
import { LoginRequestDto } from './dto/login.request';
import * as bcrypto from 'bcrypt';
import { Cat } from 'src/cats/cats.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  // 해당하는 email 이 있는지
  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    // 해당하는 password 이 있는지
    const isPasswordValidated: boolean = await bcrypto.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }
    const payload = { email: email, sub: cat.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
