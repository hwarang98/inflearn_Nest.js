import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 인증할때 사용
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에 토큰으로부터 추출
      secretOrKey: 'secret', // 환경변수로 저장
      ignoreExpiration: false, // 만료기간
    });
  }
  // async validate(payload) {}
}
