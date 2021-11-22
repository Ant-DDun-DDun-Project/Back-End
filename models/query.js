class MainQuery {
  getMainForEither = () => {
    return `
        SELECT eitherId,
               title,
               likeCnt,
               date,
               completed,
               (SELECT nickname FROM users WHERE users.id = either.user) AS nickname
        FROM either
        WHERE completed = 0
        ORDER BY likeCnt DESC
        LIMIT 10;
    `;
  };

  getMainForMulti = () => {
    return `
        SELECT multiId,
               title,
               description,
               likeCnt,
               date,
               completed,
               (SELECT nickname FROM users WHERE users.id = multi.user) AS nickname,
               (SELECT (SELECT COUNT(*)
                        FROM comments
                        WHERE multi = multi.multiId) +
                       (SELECT COUNT(*)
                        FROM childcomments
                        WHERE multi = multi.multiId))                   AS commentCnt
        FROM multi
        WHERE completed = 0
        ORDER BY likeCnt DESC
        LIMIT 10;
    `;
  };
}

class EitherQuery {
  getEither = (user) => {
    return `SELECT *,
                   (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId)       AS voteCntA,
                   (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId)       AS voteCntB,
                   (SELECT user FROM likes WHERE likes.user = ${user} AND either = either.eitherId) AS liked,
                   (SELECT nickname FROM users WHERE id = either.user)                              AS nickname,
                   (SELECT vote FROM votes WHERE user = ${user} AND either = either.eitherId)       AS voted
            FROM either
            ORDER BY eitherId DESC;`;
  };
  getIngEither = (user) => {
    return `SELECT *,
                   (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId)       AS voteCntA,
                   (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId)       AS voteCntB,
                   (SELECT nickname FROM users WHERE id = either.user)                              AS nickname,
                   (SELECT user FROM likes WHERE likes.user = ${user} AND either = either.eitherId) AS liked,
                   (SELECT vote FROM votes WHERE user = ${user} AND either = either.eitherId)       AS voted
            FROM either
            WHERE completed = 0
            ORDER BY eitherId DESC;`;
  };

  getCompleteEither = (user) => {
    return `SELECT *,
                   (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId)       AS voteCntA,
                   (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId)       AS voteCntB,
                   (SELECT nickname FROM users WHERE id = either.user)                              AS nickname,
                   (SELECT user FROM likes WHERE likes.user = ${user} AND either = either.eitherId) AS liked,
                   (SELECT vote FROM votes WHERE user = ${user} AND either = either.eitherId)       AS voted
            FROM either
            WHERE completed = 1
            ORDER BY eitherId DESC;`;
  };

  getTargetEither = (user, either_id) => {
    return `
        SELECT eitherId,
               either.user,
               title,
               contentA,
               contentB,
               date,
               edited,
               editedDate,
               likeCnt,
               completed,
               (SELECT nickname FROM users WHERE id = either.user)                                 AS nickname,
               (SELECT (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId)) AS voteCntA,
               (SELECT (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId)) AS voteCntB,
               (SELECT user FROM likes WHERE likes.user = ${user} AND either = either.eitherId)    AS liked,
               (SELECT user FROM votes WHERE votes.user = ${user} AND either = either.eitherId)    AS voted
        FROM either
        WHERE eitherId = ${either_id};
    `;
  };
}

class MultiQuery {
  getMulti = (user) => {
    return `
        SELECT *,
               (SELECT vote FROM votes WHERE votes.user = ${user} AND multi = multi.multiId) AS voted,
               (SELECT user FROM likes WHERE likes.user = ${user} AND multi = multi.multiId) AS liked,
               (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId) +
                       (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId))     AS commentCnt,
               (SELECT nickname FROM users WHERE users.id = multi.user)                      AS nickname
        FROM multi
        ORDER BY date DESC
    `;
  };

  getIngMulti = (user) => {
    return `
        SELECT *,
               (SELECT vote FROM votes WHERE votes.user = ${user} AND multi = multi.multiId) AS voted,
               (SELECT user FROM likes WHERE likes.user = ${user} AND multi = multi.multiId) AS liked,
               (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId) +
                       (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId))     AS commentCnt,
               (SELECT nickname FROM users WHERE users.id = multi.user)                      AS nickname
        FROM multi
        WHERE completed = 0
        ORDER BY date DESC
    `;
  };

  getCompleteMulti = (user) => {
    return `
        SELECT *,
               (SELECT vote FROM votes WHERE votes.user = ${user} AND multi = multi.multiId) AS voted,
               (SELECT user FROM likes WHERE likes.user = ${user} AND multi = multi.multiId) AS liked,
               (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId) +
                       (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId))     AS commentCnt,
               (SELECT nickname FROM users WHERE users.id = multi.user)                      AS nickname
        FROM multi
        WHERE completed = 1
        ORDER BY date DESC
    `;
  };

  getTargetMulti = (user, multi_id) => {
    return `
        SELECT *,
               (SELECT (SELECT COUNT(*) FROM comments WHERE multi = ${multi_id}) +
                       (SELECT COUNT(*) FROM childcomments WHERE multi = ${multi_id})) AS commentCnt,
               (SELECT vote FROM votes WHERE user = ${user} AND multi = ${multi_id})   AS voted,
               (SELECT user FROM likes WHERE user = ${user} AND multi = ${multi_id})   AS liked,
               (SELECT COUNT(*) FROM votes WHERE multi = ${multi_id} AND vote = 'A')   AS voteCntA,
               (SELECT COUNT(*) FROM votes WHERE multi = ${multi_id} AND vote = 'B')   AS voteCntB,
               (SELECT COUNT(*) FROM votes WHERE multi = ${multi_id} AND vote = 'C')   AS voteCntC,
               (SELECT COUNT(*) FROM votes WHERE multi = ${multi_id} AND vote = 'D')   AS voteCntD,
               (SELECT COUNT(*) FROM votes WHERE multi = ${multi_id} AND vote = 'E')   AS voteCntE,
               (SELECT nickname FROM users WHERE id = multi.user)                      AS nickname
        FROM multi
        WHERE multiId = ${multi_id}
    `;
  };

  getComment = (user, multi_id) => {
    return `
        SELECT *,
               (SELECT COUNT(*) FROM commentlikes WHERE commentlikes.comment = comments.id)                AS CommentLikeCnt,
               (SELECT user FROM commentlikes WHERE user = ${user} AND commentlikes.comment = comments.id) AS liked,
               (SELECT nickname FROM users WHERE id = comments.user)                                       AS nickname
        FROM comments
        WHERE multi = ${multi_id}
        ORDER BY date
    `;
  };

  getChildComment = (user, multi_id) => {
    return `
        SELECT *,
               (SELECT COUNT(*) FROM commentlikes WHERE commentlikes.childComment = childcomments.id) AS commentLikeCnt,
               (SELECT nickname FROM users WHERE id = childcomments.user)                             AS nickname,
               (SELECT user
                FROM commentlikes
                WHERE user = ${user}
                  AND commentlikes.childComment = childcomments.id)                                   AS liked
        FROM childcomments
        WHERE multi = ${multi_id}
        ORDER BY date
    `;
  };
}

class ProfileQuery {
  getMyPosts = (user_id) => {
    return `
        SELECT multiId,
               user,
               title,
               date,
               editedDate,
               completed,
               likeCnt,
               (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId) +
                       (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId)) AS commentCnt
        FROM multi WHERE user = ${user_id};
    `;
  };

  getMyPollsForEither = (user_id) => {
    return `
        SELECT either AS eitherId,
               either.user,
               either.title,
               either.date,
               either.completed,
               either.likeCnt,
               (SELECT nickname FROM users WHERE users.id = either.user) AS nickname
        FROM votes
                 INNER JOIN either ON votes.either = either.eitherId
        WHERE votes.user = ${user_id}
          AND either.eitherId = votes.either;
    `;
  };

  getMyPollsForMulti = (user_id) => {
    return `
        SELECT multi                                                                     AS multiId,
               multi.user,
               multi.title,
               multi.date,
               multi.completed,
               multi.likeCnt,
               (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId) +
                       (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId)) AS commentCnt,
               (SELECT nickname FROM users WHERE users.id = multi.user) AS nickname
        FROM votes
                 INNER JOIN multi ON votes.multi = multi.multiId
        WHERE votes.user = ${user_id}
          AND multi.multiId = votes.multi;
    `;
  };
}

class SearchQuery {
  searchEither = (keyword) => {
    return `
        SELECT eitherId, user, title, date, editedDate, completed, likeCnt,
               (SELECT nickname FROM users WHERE either.user = users.id) AS nickname
        FROM either
        WHERE title LIKE '%${keyword}%'
        ORDER BY eitherId DESC
    `;
  };

  searchMulti = (keyword) => {
    return `
        SELECT multiId,
               user,
               title,
               date,
               editedDate,
               completed,
               likeCnt,
               (SELECT (SELECT COUNT(*) FROM comments WHERE multi = multi.multiId) +
                       (SELECT COUNT(*) FROM childcomments WHERE multi = multi.multiId)) AS commentCnt,
               (SELECT nickname FROM users WHERE multi.user = users.id) AS nickname
        
        FROM multi
        WHERE title LIKE '%${keyword}%'
           OR description LIKE '%${keyword}%'
        ORDER BY multiId DESC
    `;
  };
}

module.exports = { MainQuery, EitherQuery, MultiQuery, ProfileQuery, SearchQuery };
