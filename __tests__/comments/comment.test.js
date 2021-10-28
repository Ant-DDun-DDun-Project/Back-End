jest.mock('../../models/either');
jest.mock('../../models/votes');
jest.mock('../../models/users');
jest.mock('../../models/Multi');
jest.mock('../../models/likes');
jest.mock('../../models/comments');
jest.mock('../../models/child-comments');
jest.mock('../../models/comment-likes');
const { Comment } = require('../../models');
const { postComment, deleteComment, editComment } = require('../../controllers/comment');

describe('댓글등록', () => {
  const req = {
    params: {
      multi_id: '1',
    },
    body: {
      comment: '안녕하세요',
      date: '2021-10-26-19-43-23',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: '1',
    },
  };
  next = jest.fn();
  test('댓글을 등록에 성공하면 response로 success:true를 보내준다', async () => {
    await postComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('댓글 작성시 DB에러 발생 시 next(err)를 호출한다', async () => {
    const err = 'DB에러';
    await Comment.create.mockRejectedValue(err);
    await postComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('댓글 수정에 대한 검사', () => {
  const req = {
    params: {
      multi_id: 1,
      comment_id: 1,
    },
    body: {
      comment: '수정되었습니다.',
      editedDate: '2021-10-28 11:11:10',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: 1,
    },
  };
  const next = jest.fn();

  test('댓글 수정에 성공하였으면 / success: true / 를 응답으로 보내준다.', async () => {
    await Comment.findOne.mockReturnValue(true);
    await Comment.update.mockReturnValue(true);
    await editComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });

  test('DB 에 정보가 없을 경우 / success: false / 를 응답으로 보내준다.', async () => {
    await Comment.findOne.mockReturnValue(null);
    await Comment.update.mockReturnValue(true);
    await editComment(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('DB 요청에 대한 에러가 발생', async () => {
    const err = 'DB error';
    await Comment.findOne.mockReturnValue(true);
    Comment.update.mockReturnValue(Promise.reject(err));
    await editComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('댓글 삭제에 대한 검사', () => {
  const req = {
    params: {
      multi_id: 1,
      comment_id: 1,
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: 1,
    },
  };
  const next = jest.fn();

  test('댓글 삭제에 성공하였으면 / success: true / 를 응답으로 보내준다.', async () => {
    await Comment.findOne.mockReturnValue(true);
    await Comment.update.mockReturnValue(true);
    await deleteComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });

  test('DB 에 정보가 없을 경우 / success: false / 를 응답으로 보내준다.', async () => {
    await Comment.findOne.mockReturnValue(null);
    //
    await deleteComment(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('DB 요청에 대한 에러가 발생', async () => {
    const err = 'DB error';
    await Comment.findOne.mockReturnValue(true);
    Comment.update.mockReturnValue(Promise.reject(err));
    await deleteComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
