module.exports = {
  //정렬되지 않은 객관식 게시물을 특정 게시물 기준으로 정렬하는 함수
  sortMulti: (unsortedPosts, posts_id) => {
    const multi = [];
    while (unsortedPosts.length > 0 && unsortedPosts[0].multiId != posts_id) {
      //잘못된 파라미터가 들어왔을때를 방지하기 위한 조건
      multi.push(unsortedPosts.shift());
    }
    return [...unsortedPosts, ...multi];
  },
  //정렬되지 않은 찬반 게시물을 특정 게시물 기준으로 정렬하는 함수
  sortEither: (unsortedPosts, posts_id) => {
    const either = [];
    while (unsortedPosts.length > 0 && unsortedPosts[0].eitherId != posts_id) {
      //잘못된 파라미터가 들어왔을때를 방지하기 위한 조건
      either.push(unsortedPosts.shift());
    }
    return [...unsortedPosts, ...either];
  },
};
