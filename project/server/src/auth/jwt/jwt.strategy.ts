import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRepository } from '../../cats/cats.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 인증할때 사용
  constructor(private readonly catsRepository: CatsRepository) {
    // jwt에 대한 설정
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에 토큰으로부터 추출
      secretOrKey: 'secret', // 환경변수로 저장
      ignoreExpiration: false, // 만료기간
    });
  }

  // 디코딩된 페이로드가 적합한지 판별
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );
    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('접근오류');
    }
  }
}
