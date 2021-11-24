import { MainPost } from './main';

// 내가 쓴 객관식 게시글
export interface ProfileMulti extends MainPost {
  multiId?: number;
  commentCnt?: number;
}

// 내가 참여한 찬반 게시글
export interface EitherList extends MainPost {
  eitherId?: number;
  user?: number;
}

// 내가 참여한 객관식 게시글
export interface MultiList extends MainPost {
  multiId?: number;
  user?: number;
  commentCnt?: number;
}