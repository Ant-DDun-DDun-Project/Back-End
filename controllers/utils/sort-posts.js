module.exports = {
  //정렬되지 않은 객관식 게시물을 특정 게시물 기준으로 정렬하는 함수
  sortMulti: (unsortedPosts, posts_id) => {
    const multi = [];
    while (unsortedPosts.length > 0) {
      //잘못된 파라미터가 들어왔을때를 방지하기 위한 조건
      if (unsortedPosts[0].multiId != posts_id) {
        multi.push(unsortedPosts.shift());
      } else if (unsortedPosts[0].multiId === posts_id) {
        break;
      }
    }
    return [...unsortedPosts, ...multi];
  },
  //정렬되지 않은 찬반 게시물을 특정 게시물 기준으로 정렬하는 함수
  sortEither: (unsortedPosts, posts_id) => {
    const either = [];
    while (unsortedPosts.length > 0) {
      //잘못된 파라미터가 들어왔을때를 방지하기 위한 조건
      if (unsortedPosts[0].eitherId != posts_id) {
        either.push(unsortedPosts.shift());
      } else if (unsortedPosts[0].eitherId === posts_id) {
        break;
      }
    }
    return [...unsortedPosts, ...either];
  },
};
