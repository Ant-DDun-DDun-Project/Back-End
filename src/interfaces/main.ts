// 메인페이지 게시글
export interface MainPost {
  title?: string;
  likeCnt?: number;
  date?: string;
  completed?: boolean;
  nickname?: string;
}

// 메인페이지 찬반
export interface MainEither extends MainPost {
  eitherId?: number
}

// 메인페이지 객관식
export interface MainMulti extends MainPost {
  multiId?: number;
  description?: string;
  commentCnt?: number;
}

