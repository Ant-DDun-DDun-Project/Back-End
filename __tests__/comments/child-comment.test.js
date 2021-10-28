jest.mock('../../models/either');
jest.mock('../../models/votes');
jest.mock('../../models/users');
jest.mock('../../models/Multi');
jest.mock('../../models/likes');
jest.mock('../../models/comments');
jest.mock('../../models/child-comments');
jest.mock('../../models/comment-likes');
const { ChildComment, CommentLike } = require('../../models');
const {
  postChildComment,
  editChildComment,
  deleteChildComment,
  likeChildComment,
} = require('../../controllers/child-comment');

describe('대댓글 등록', () => {
  const req = {
    params: {
      multi_id: '1',
      comment_id: '1',
    },
    body: {
      comment: '안녕하세요의안녕하세요',
      date: '2021-10-26 11:04:52',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: '1',
    },
  };
  const next = jest.fn();
  test('대댓글 등록에 성공하면 success:true를 보내준다', async () => {
    await postChildComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
    });
  });
  test('댓글 작성시 DB에러 발생 시 next(err)를 호출한다', async () => {
    const err = 'DB에러';
    await ChildComment.create.mockRejectedValue(err);
    await postChildComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('대댓글 수정', () => {
  const req = {
    params: {
      multi_id: '1',
      comment_id: '1',
    },
    body: {
      comment: '하하하하하',
      editedDate: '2021-10-27 22:51:22',
    },
  };
  const res = {
    locals: {
      user: '1',
    },
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();
  test('댓글수정에 성공하면 response로 success:true를 보낸다', async () => {
    await ChildComment.findOne.mockReturnValue(
      Promise.resolve({
        id: 1,
        comment: '댓글입니다!',
        date: '2021-10-27 11:10:8',
        edited: false,
        editedDate: null,
        user: '1',
        multi: '1',
      })
    );
    await ChildComment.update.mockReturnValue(
      Promise.resolve({
        id: 1,
        comment: '하하하하하',
        date: '2021-10-27 11:10:8',
        edited: true,
        editedDate: '2021-10-27 22:51:22',
        user: '1',
        multi: '1',
      })
    );
    await editChildComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });
  test('댓글 수정 시 수정할 댓글을 찾지 못하면 response로 success:false를 보낸다', async () => {
    await ChildComment.findOne.mockReturnValue(null);
    await editChildComment(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('DB 에러(findOne) 시 next(err)를 호출한다.', async () => {
    const err = 'DB에러';
    await ChildComment.findOne.mockRejectedValue(err);
    await editChildComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 에러(update) 시 next(err)를 호출한다.', async () => {
    const err = 'DB에러';
    await ChildComment.update.mockRejectedValue(err);
    await editChildComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('대댓글에 대한 검사', () => {
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

  test('대댓글 작성에 성공한 경우 / success: true / 를 응답으로 보낸다', async () => {
    await ChildComment.findOne.mockReturnValue(true);
    await ChildComment.update.mockReturnValue(true);
    await deleteChildComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ success: true });
  });

  test('대댓글 정보가 DB에 존재하지 않는 경우 / success: false / 를 응답으로 보낸다.', async () => {
    await ChildComment.findOne.mockReturnValue(null);
    await deleteChildComment(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });

  test('ChildComment.update() 에 대한 DB 에러 발생', async () => {
    const err = 'DB err';
    await ChildComment.findOne.mockReturnValue(true);
    ChildComment.update.mockReturnValue(Promise.reject(err));
    await deleteChildComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('ChildComment.findOne() 에 대한 DB 에러 발생', async () => {
    const err = 'DB err';
    ChildComment.findOne.mockReturnValue(Promise.reject(err));
    await deleteChildComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});

describe('대댓글 좋아요', () => {
  const req = {
    params: {
      multi_id: '1',
      comment_id: '1',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
      user: '1',
    },
  };
  const next = jest.fn();
  test('대댓글 좋아요가 성공하면 response로 success:true를 보내준다', async () => {
    await CommentLike.findOne.mockReturnValue(null);
    await CommentLike.create.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: '1',
        comment: null,
      })
    );
    await CommentLike.count.mockReturnValue(1);
    ChildComment.update.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        multi: '1',
        parentComment: '1',
        comment: '테스트',
        date: '2021-10-28 14:16:11',
        eidited: false,
        editedDate: null,
        deleted: false,
        likeCnt: '1',
      })
    );
    await likeChildComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      likeCnt: 1,
    });
  });
  test('대댓글 좋아요가 이미 되어 있으면 response로 success:false를 보내준다', async () => {
    CommentLike.findOne.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: '1',
        comment: null,
      })
    );
    await likeChildComment(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('DB 요청(findOne)에 대한 에러가 발생', async () => {
    const err = 'DB error';
    await CommentLike.findOne.mockRejectedValue(err);
    await likeChildComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 요청(findOne 성공시 create에서 에러)에 대한 에러가 발생', async () => {
    const err = 'DB error';
    CommentLike.findOne.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: '1',
        comment: null,
      })
    );
    await CommentLike.create.mockRejectedValue(err);
    await likeChildComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 요청(findOne,create 성공시 count에서 에러)에 대한 에러가 발생', async () => {
    const err = 'DB error';
    CommentLike.findOne.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: '1',
        comment: null,
      })
    );
    await CommentLike.create.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: '1',
        comment: null,
      })
    );
    await CommentLike.count.mockRejectedValue(err);
    await likeChildComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 요청(findOne,create,count 성공시 update에서 에러)에 대한 에러가 발생', async () => {
    const err = 'DB error';
    CommentLike.findOne.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: '1',
        comment: null,
      })
    );
    await CommentLike.create.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: '1',
        comment: null,
      })
    );
    await CommentLike.count.mockReturnValue(1);
    await ChildComment.update.mockRejectedValue(err);
    await likeChildComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
