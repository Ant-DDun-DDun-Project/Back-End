// either, multi 에 대한 인터페이스

export interface PostInfo {
  title?: string;
  contentA?: string;
  contentB?: string;
}

// either, multi 에 대한 인터페이스
export interface PostAttributes extends PostInfo{
  date?: string;
  completed?: boolean;
  edited?: boolean;
  editedDate?: string;
  likeCnt?: number;
  user?: number;
  liked?: number;
  nickname?: string;
  voted?: string;
}

// either 에 대한 인터페이스
export interface EitherInfo extends PostAttributes {
  eitherId?: number;
  voteCntA?: number;
  voteCntB?: number;
}

// multi 에 대한 인터페이스
export interface MultiInfo extends PostAttributes {
  multiId?: number;
  description?: string;
  contentC?: string;
  contentD?: string;
  contentE?: string;
  commentCnt?: number;
}

// multi target 에 대한 인터페이스
export interface TargetMultiInfo extends MultiInfo {
  voteCntA?: number;
  voteCntB?: number;
  voteCntC?: number;
  voteCntD?: number;
  voteCntE?: number;
}

export interface MultiReq extends PostInfo {
  description?: string;
  contentC?: string;
  contentD?: string;
  contentE?: string;
}