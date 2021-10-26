test(`비밀번호를 입력했을때 
        password와 passwordCheck가 일치할 때,
        true를 반환한다.`, () => {
  expect(passwordValidation('aaaaaa', 'aaaaaa')).toEqual(true);
  expect(passwordValidation('AAAAAA', 'AAAAAA')).toEqual(true);
  expect(passwordValidation('111111', '111111')).toEqual(true);
  expect(passwordValidation('!@#$%^&*', '!@#$%^&*')).toEqual(true);
  expect(passwordValidation('aaAA11!@', 'aaAA11!@')).toEqual(true);
});

test('비밀번호를 입력했을때 password와 passwordcheck가 일치하지 않으면 false를 반환한다.', () => {
  expect(passwordValidation('aaaaa', 'aaaa')).toEqual(false);
  expect(passwordValidation('aaaaa', 'aaaaA')).toEqual(false);
  expect(passwordValidation('aaaaa', 'aaaaaa')).toEqual(false);
});
