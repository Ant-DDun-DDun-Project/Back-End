import joi from './joi'
import { Request, Response , NextFunction} from 'express';
import { User } from '../models';
import * as bcrypt from 'bcrypt';
import { createToken} from './utils/create-token';
import 'dotenv/config'
import { UserModel } from '../models/users';

class userControllers {
  // 로그인
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, pw }: {userId: string, pw: string} = await joi.loginSchema.validateAsync(req.body); //req.body로 user정보(아이디,비밀번호)를 받는다
      const userData: UserModel = await User.findOne({ where: { userId } }); //user의 아이디로 user 유무를 찾는다.
      const pwCheck: boolean = await bcrypt.compare(pw, userData.pw); //비밀번호를 db에 있는 비밀번호와 일치하는지 체크한다
      if (!userData || !pwCheck) {
        //user가 없거나, 비밀번호가 일치하지 않으면
        res.status(400).json({ success: false }); //status code는 400, success:false 라는 메세지를 보내줌
      } else {
        //user도 있고, 비밀번호도 일치하면
        const nickname: string = userData.nickname; //user의 닉네임
        const userId: number = userData.id; //user의 아이디
        const token: string = createToken(userId); //user의 아이디를 페이로드에 담은 토큰을 만든다.
        res.cookie('user', token, {
          //user라는 이름에 value는 위에서 만든 토큰을 담아서 쿠키를 만든다.
          maxAge: 3 * 24 * 60 * 60 * 1000, //유효기간 3일
          //httpOnly: true, //httpOnly 속성
          //secure: true, //https에서만 통신 가능한 옵션
          //sameSite: 'None', //서로 다른 도메인간의 쿠키 전송에 대한 보안 설정, none옵션의 경우 동일 사이트와 크로스 사이트에 모든 쿠키 전송 가능
          //signed: true, //서명 쿠키옵션 사용(사이트에서 발급한 쿠키 인증)
        });
        res.status(200).json({ success: true, nickname, userId }); //status code는 200, success:true, 닉네임과 user의 아이디를 보내준다.
      }
    } catch (err) {
      next(err);
    }
  };
}

export default new userControllers();