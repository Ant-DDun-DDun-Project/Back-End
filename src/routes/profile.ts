import * as express from 'express';
import profileController from '../controllers/profile';
const router = express.Router();
import { auth } from '../middlewares/auth';

router.get('/:user_id', auth, profileController.getProfile); //프로필 페이지 뷰
router.get('/:user_id/posts', auth, profileController.getMyPosts); //내가 쓴 글 뷰
router.get('/:user_id/polls', auth, profileController.getMyPolls); //내가 참여한 글 뷰
router.patch('/nick', auth, profileController.editNickname); //닉네임 변경

export default router;
