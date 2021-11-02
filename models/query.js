class MainQuery {
  getMainForEither = () => {
    return `
    SELECT eitherId, title, likeCnt, date,
      (SELECT nickname FROM users WHERE users.id = either.user)  AS nickname
    FROM either WHERE completed = 0
    ORDER BY likeCnt DESC
    LIMIT 10;
    `;
  };

  getMainForMulti = () => {
    return `
    SELECT multiId, title, description, likeCnt, date,
      (SELECT nickname FROM users WHERE users.id = multi.user)  AS nickname,
      (SELECT 
        (SELECT COUNT(*) FROM comments 
        WHERE multi = multi.multiId) +
        (SELECT COUNT(*) FROM childcomments 
        WHERE multi = multi.multiId))  AS commentCnt
    FROM multi WHERE completed = 0
    ORDER BY likeCnt DESC
    LIMIT 10;
    `;
  };
}

class EitherQuery {
  getEither = (user) => {
    return `SELECT *,
    (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId) AS voteCntA,
    (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId) AS voteCntB,
    (SELECT user FROM likes WHERE likes.user = ${user} AND either = either.eitherId) AS liked,
    (SELECT nickname FROM users WHERE id = either.user)                        AS nickname,
    (SELECT vote FROM votes WHERE user = ${user} AND either = either.eitherId) AS voted
    FROM either
    ORDER BY eitherId DESC;`;
  };
  getIngEither = (user) => {
    return `SELECT *,
    (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId) AS voteCntA,
    (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId) AS voteCntB,
    (SELECT nickname FROM users WHERE id = either.user)                        AS nickname,
    (SELECT user FROM likes WHERE likes.user = ${user} AND either = either.eitherId) AS liked,
    (SELECT vote FROM votes WHERE user = ${user} AND either = either.eitherId) AS voted
    FROM either
    WHERE completed = 0
    ORDER BY eitherId DESC;`;
  };

  getCompleteEither = (user) => {
    return `SELECT *,
    (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId) AS voteCntA,
    (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId) AS voteCntB,
    (SELECT nickname FROM users WHERE id = either.user)                        AS nickname,
    (SELECT user FROM likes WHERE likes.user = ${user} AND either = either.eitherId) AS liked,
    (SELECT vote FROM votes WHERE user = ${user} AND either = either.eitherId) AS voted
    FROM either
    WHERE completed = 1
    ORDER BY eitherId DESC;`;
  };

  getTargetEither = (user, either_id) => {
    return `
      SELECT eitherId, either.user, title, contentA, contentB, date, edited, editedDate, likeCnt,completed,
      (SELECT nickname FROM users WHERE id = either.user) AS nickname,
      (SELECT (SELECT COUNT(*) FROM votes WHERE vote = 'A' AND either = either.eitherId))  AS voteCntA,
      (SELECT (SELECT COUNT(*) FROM votes WHERE vote = 'B' AND either = either.eitherId))  AS voteCntB,
      (SELECT user FROM likes WHERE likes.user = ${user} AND either = either.eitherId) AS liked,
      (SELECT user FROM votes WHERE votes.user = ${user} AND either = either.eitherId) AS voted
      FROM either
      WHERE eitherId = ${either_id};
    `;
  };
}

module.exports = { MainQuery, EitherQuery };
