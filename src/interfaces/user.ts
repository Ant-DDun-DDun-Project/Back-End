// User 정보
export interface UserInfo {
  userId: string;
  pw: string;
}

// 회원가입 정보
export interface SignUp extends UserInfo {
  nickname: string;
  confirmPw: string;
  ageGroup: number;
}