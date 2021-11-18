import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { UserModel } from '../models/users';
import { validatePassword } from './util/password-validation'
import * as bcrypt from 'bcrypt';
import joi from './joi'
import 'dotenv/config'

const salt = Number(process.env.SALT)

class userControllers {
  // 회원가입
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        userId,
        nickname,
        pw,
        confirmPw,
        ageGroup
      }: { userId: string, nickname: string, pw: string, confirmPw: string, ageGroup: number } = await joi.signUpSchema.validateAsync(
        req.body
      ); //req.body로 user정보(아이디, 닉네임, 비밀번호, 비밀번호확인, 연령대)를 받는다.
      if (validatePassword(pw, confirmPw)) {
        //비밀번호와 비밀번호 확인이 일치하면 true, 불일치하면 false를 return한다.
        const [encryptedPw, userExist] = await Promise.all([
          //Promise.all로 비밀번호를 암호화하고 user의 아이디로 user 유무를 찾는다.
          bcrypt.hash(pw, salt),
          User.findOne({ where: { userId } }),
        ]);
        if (!userExist) {
          //user가 존재하지 않으면
          await User.create({
            //user 데이터를 만든다(아이디, 닉네임, 암호화된 비밀번호, 연령대)
            userId,
            nickname,
            pw: encryptedPw,
            ageGroup,
          });
          return res.status(201).json({ success: true }); //status code는 201, success: true라는 메세지를 보내줌
        } else {
          //user의 아이디로 찾은 user가 있으면
          return res.status(400).json({ success: false, msg: '중복된 아이디입니다.' }); //status code는 400, success:false, msg: '중복된 아이디입니다.'라는 메세지를 보내줌
        }
      } else {
        //비밀번호와 비밀번호 확인 값이 같지 않으면
        res.status(400).json({ success: false, msg: '비밀번호를 확인해주세요.' }); //status code는 400, success:false, msg: '비밀번호를 확인해주세요.'라는 메세지를 보내줌
      }
    } catch (err) {
      next(err);
    }
  }
  public checkLoginStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: number = res.locals.user; //auth 미들웨어를 통해서 받은 user의 고유id
      if (user === 13) {
        //guest일 경우
        res.status(200).json({ success: true, nickname: 'GUEST' }); //status code는 200, success: true, nickname: 'GUEST'라는 메세지를 보내준다.
      } else {
        //user가 있으면
        const loginUser: UserModel = await User.findOne({ where: { id: user } }); //user의 고유id로 로그인한 user의 데이터를 불러온다
        if (!loginUser) {
          //해당 id를 가진 user가 없으면
          res.status(400).json({ success: false }); //stauts code는 400, success: false라는 메세지를 보내준다.
        } else {
          //해당 id를 가진 user가 있으면
          res.status(200).json({ success: true, nickname: loginUser.nickname, user }); //status code는 200, success:true, 닉네임과 user의 고유id를 보내준다
        }
      }
    } catch (err) {
      next(err);
    }
  };
}

export default new userControllers();

