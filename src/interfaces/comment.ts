// comment 인터페이스
export interface CommentInfo {
  id?: number;
  comment?: string;
  date?: string;
  edited?: boolean;
  editedDate?: string;
  deleted?: boolean;
  likeCnt?: number;
  user?: number;
  multi?: number;
  nickname?: string;
  liked?: number;
}