import { Request, Response, NextFunction } from 'express';
import { User } from '../models';

class userControllers {
  public checkLoginStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user; //auth 미들웨어를 통해서 받은 user의 고유id
      if (user === 13) {
        //guest일 경우
        res.status(200).json({ success: true, nickname: 'GUEST' }); //status code는 200, success: true, nickname: 'GUEST'라는 메세지를 보내준다.
      } else {
        //user가 있으면
        const loginUser = await User.findOne({ where: { id: user } }); //user의 고유id로 로그인한 user의 데이터를 불러온다
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
