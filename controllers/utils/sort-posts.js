module.exports = {
  sortMulti: (unsortedposts, posts_id) => {
    const multi = [];
    while (unsortedposts.length > 0) {
      if (unsortedposts[0].multiId != posts_id) {
        const large = unsortedposts.shift();
        multi.push(large);
      } else if (unsortedposts[0].multiId == posts_id) {
        break;
      }
    }
    return [...unsortedposts, ...multi];
  },
  sortEither: (unsortedposts, posts_id) => {
    const either = [];
    while (unsortedposts.length > 0) {
      if (unsortedposts[0].eitherId != posts_id) {
        const large = unsortedposts.shift();
        either.push(large);
      } else if (unsortedposts[0].eitherId == posts_id) {
        break;
      }
    }
    unsortedposts.push(either);
    return [...unsortedposts, ...either];
  },
};
