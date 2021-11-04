jest.mock('../../models/either');
jest.mock('../../models/votes');
jest.mock('../../models/users');
jest.mock('../../models/multi');
jest.mock('../../models/likes');
jest.mock('../../models/comments');
jest.mock('../../models/child-comments');
jest.mock('../../models/comment-likes');
const { Comment, CommentLike, User } = require('../../models');
const {
  postComment,
  deleteComment,
  editComment,
  likeComment,
} = require('../../controllers/comment');

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
  const next = jest.fn();
  test('댓글을 등록에 성공하면 response로 success:true를 보내준다', async () => {
    await Comment.create.mockReturnValue({
      dataValues: {
        id: 1,
        comment: '살려줘',
        date: '2021-10-27 12:10:58',
        edited: 0,
        editedDate: '2021-10-28 13:15:12',
        deleted: 0,
        user: 1,
        multi: 1
      }
    });
    await User.findOne.mockReturnValue({ nickname: 'test' });
    await postComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      newComment: {
        nickname: 'test',
        id: 1,
        comment: '살려줘',
        date: '2021-10-27 12:10:58',
        edited: 0,
        editedDate: '2021-10-28 13:15:12',
        deleted: 0,
        user: 1,
        multi: 1
      }
    });
  });
  test('댓글 작성시 DB에러 발생 시 next(err)를 호출한다 --> Comment.create', async () => {
    const err = 'DB에러';
    await Comment.create.mockRejectedValue(err);
    await postComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('댓글 작성시 DB에러 발생 시 next(err)를 호출한다. --> User.findOne', async () => {
    const err = 'DB에러';
    await Comment.create.mockReturnValue(true);
    await User.findOne.mockRejectedValue(err);
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
    await Comment.findOne.mockReturnValueOnce(true);
    await Comment.update.mockReturnValue(true);
    await Comment.findOne.mockReturnValueOnce({
      dataValues: {
        id: 1,
        comment: '살려줘',
        date: '2021-10-27 12:10:58',
        edited: 0,
        editedDate: '2021-10-28 13:15:12',
        deleted: 0,
        user: 1,
        multi: 1
      }
    });
    await User.findOne.mockReturnValue({ nickname: 'test' });
    await editComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      newComment: {
        id: 1,
        comment: '살려줘',
        date: '2021-10-27 12:10:58',
        edited: 0,
        editedDate: '2021-10-28 13:15:12',
        deleted: 0,
        user: 1,
        multi: 1,
        nickname: 'test'
      }
    });
  });

  test('DB 에 정보가 없을 경우 / success: false / 를 응답으로 보내준다.', async () => {
    await Comment.findOne.mockReturnValue(null);
    await editComment(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('DB 수정요청에 대한 에러 발생 --> Comment.findOne', async () => {
    const err = 'DB error';
    await Comment.findOne.mockRejectedValue(err);
    await editComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('DB 수정요청에 대한 에러가 발생 --> Comment.update', async () => {
    const err = 'DB error';
    await Comment.findOne.mockReturnValue(true);
    await Comment.update.mockRejectedValue(err);
    await editComment(req, res, next);
    expect(next).toBeCalledWith(err);

  });

  test('DB 수정 후 찾기 대한 에러가 발생', async () => {
    const err = 'DB error';
    await Comment.findOne.mockReturnValueOnce(true);
    await Comment.update.mockReturnValue(true);
    await Comment.findOne.mockRejectedValueOnce(err);
    await editComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('DB 수정 후 닉네임 찾기 대한 에러 발생 --> User.findOne', async () => {
    const err = 'DB error';
    await Comment.findOne.mockReturnValueOnce(true);
    await Comment.update.mockReturnValue(true);
    await Comment.findOne.mockReturnValueOnce(true);
    await User.findOne.mockRejectedValue(err);
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
  const err = 'DB error';

  test('댓글 삭제에 성공하였으면 / success: true / 를 응답으로 보내준다.', async () => {
    await Comment.findOne.mockReturnValueOnce(true);
    await Comment.update.mockReturnValue(true);
    await Comment.findOne.mockReturnValueOnce({
      dataValues: {
        id: 1,
        comment: '살려줘',
        date: '2021-10-27 12:10:58',
        edited: 0,
        editedDate: '2021-10-28 13:15:12',
        deleted: 0,
        user: 1,
        multi: 1
      }
    });
    await User.findOne.mockReturnValue({ nickname: 'test' });
    await deleteComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(
      {
        success: true,
        newComment: {
          id: 1,
          comment: '살려줘',
          date: '2021-10-27 12:10:58',
          edited: 0,
          editedDate: '2021-10-28 13:15:12',
          deleted: 0,
          user: 1,
          multi: 1,
          nickname: 'test'
        }
      });
  });

  test('DB 에 정보가 없을 경우 / success: false / 를 응답으로 보내준다.', async () => {
    await Comment.findOne.mockReturnValue(null);
    await deleteComment(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });

  test('DB 삭제요청에 대한 에러가 발생 --> Comment.findOne', async () => {
    await Comment.findOne.mockRejectedValueOnce(err);
    await deleteComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('DB 삭제요청에 대한 에러가 발생', async () => {
    await Comment.findOne.mockReturnValue(true);
    await Comment.update.mockRejectedValue(err);
    await deleteComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('DB 삭제 후 찾기요청에 대한 에러가 발생', async () => {
    await Comment.findOne.mockReturnValue(true);
    await Comment.update.mockReturnValue(true);
    await Comment.findOne.mockRejectedValue(err);
    await deleteComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });

  test('DB 삭제 후 닉네임찾기에 대한 에러 발생 --> User.findOne', async () => {
    await Comment.findOne.mockReturnValueOnce(true);
    await Comment.update.mockReturnValue(true);
    await Comment.findOne.mockReturnValueOnce(true);
    await User.findOne.mockRejectedValue(err);
    expect(next).toBeCalledWith(err);
  });
});

describe('댓글 좋아요', () => {
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
  test('댓글 좋아요가 성공하면 response로 success:true를 보내준다', async () => {
    await CommentLike.findOne.mockReturnValue(null);
    await CommentLike.create.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: null,
        comment: '1',
      })
    );
    await CommentLike.count.mockReturnValue(1);
    Comment.update.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        multi: '1',
        comment: '테스트',
        date: '2021-10-28 14:16:11',
        eidited: false,
        editedDate: null,
        deleted: false,
        likeCnt: '1',
      })
    );
    await likeComment(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      likeCnt: 1,
    });
  });
  test('댓글 좋아요가 이미 되어 있으면 response로 success:false를 보내준다', async () => {
    CommentLike.findOne.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: null,
        comment: '1',
      })
    );
    await likeComment(req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false });
  });
  test('DB 요청(findOne)에 대한 에러가 발생', async () => {
    const err = 'DB error';
    await CommentLike.findOne.mockRejectedValue(err);
    await likeComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 요청(findOne 성공시 create에서 에러)에 대한 에러가 발생', async () => {
    const err = 'DB error';
    CommentLike.findOne.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: null,
        comment: '1',
      })
    );
    await CommentLike.create.mockRejectedValue(err);
    await likeComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 요청(findOne,create 성공시 count에서 에러)에 대한 에러가 발생', async () => {
    const err = 'DB error';
    CommentLike.findOne.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: null,
        comment: '1',
      })
    );
    await CommentLike.create.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: null,
        comment: '1',
      })
    );
    await CommentLike.count.mockRejectedValue(err);
    await likeComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
  test('DB 요청(findOne,create,count 성공시 update에서 에러)에 대한 에러가 발생', async () => {
    const err = 'DB error';
    CommentLike.findOne.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: null,
        comment: '1',
      })
    );
    await CommentLike.create.mockReturnValue(
      Promise.resolve({
        id: '1',
        user: '1',
        childComment: null,
        comment: '1',
      })
    );
    await CommentLike.count.mockReturnValue(1);
    await Comment.update.mockRejectedValue(err);
    await likeComment(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
