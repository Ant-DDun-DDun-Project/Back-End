import * as jwt from 'jsonwebtoken';

// 토큰 발급
export function createToken(id: number): string {
  //user의 id값(로그인 시 필요한 아이디)을 인자로 받음
  return jwt.sign({ id }, process.env.SECRET_KEY, {});
}
