const clearData = {
  userId: 'a_aa-aa_a',
  nickname: '황창환',
  pw: 'zxcv1234!@',
  confirmPw: 'zxcv1234!@',
  ageGourp: 50,
};

test('회원가입 시 아이디는 5-20자의 영문소문자, 숫자, 특수기호(-),(_)가 아니면 에러를 반환한다', async () => {
  await expect(
    schema.signUpSchema.validateAsync({
      userId: '!!!!!',
      nickname: clearData.nickname,
      pw: clearData.pw,
      confirmPw: clearData.confirmPw,
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: 'AAAAA',
      nickname: clearData.nickname,
      pw: clearData.pw,
      confirmPw: clearData.confirmPw,
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: '<script></script>',
      nickname: clearData.nickname,
      pw: clearData.pw,
      confirmPw: clearData.confirmPw,
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: '[][][]',
      nickname: clearData.nickname,
      pw: clearData.pw,
      confirmPw: clearData.confirmPw,
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: '{}{}{}{}',
      nickname: clearData.nickname,
      pw: clearData.pw,
      confirmPw: clearData.confirmPw,
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: '황창환입니다',
      nickname: clearData.nickname,
      pw: clearData.pw,
      confirmPw: clearData.confirmPw,
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: true,
      nickname: clearData.nickname,
      pw: clearData.pw,
      confirmPw: clearData.confirmPw,
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: false,
      nickname: clearData.nickname,
      pw: clearData.pw,
      confirmPw: clearData.confirmPw,
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: 'aaaa',
      nickname: clearData.nickname,
      pw: clearData.pw,
      confirmPw: clearData.confirmPw,
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
});
test('회원가입시 비밀번호는 8~16자 영문 소문자, 숫자, 특수문자(!,@,#,$,%,^,&,-,?)가 아니면 에러를 반환한다.', async () => {
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: clearData.nickname,
      pw: 'asdf123',
      confirmPw: 'asdf123',
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: clearData.nickname,
      pw: 'asdf1234!.',
      confirmPw: 'asdf1234!.',
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: clearData.nickname,
      pw: 'asdf1234!황',
      confirmPw: 'asdf1234!황',
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: clearData.nickname,
      pw: 'asdf1234![]',
      confirmPw: 'asdf1234![]',
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: clearData.nickname,
      pw: 'asdf1234!{}',
      confirmPw: 'asdf1234!{}',
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: clearData.nickname,
      pw: true,
      confirmPw: true,
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: clearData.nickname,
      pw: '안녕하세요한글도되나요',
      confirmPw: '안녕하세요한글도되나요',
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: clearData.nickname,
      pw: false,
      confirmPw: false,
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
  await expect(
    schema.signUpSchema.validateAsync({
      userId: clearData.userId,
      nickname: clearData.nickname,
      pw: '<script></script>',
      confirmPw: '<script></script>',
      ageGourp: clearData.ageGourp,
    })
  ).rejects.toThrowError();
});
