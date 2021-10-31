exports.countVote = async (total) => {
  let voteCntA = 0,
    voteCntB = 0,
    voteCntC = 0,
    voteCntD = 0,
    voteCntE = 0;
  for (let i = 0; i < total.length; i++) {
    if (total[i].vote == 'A') {
      voteCntA++;
    } else if (total[i].vote == 'B') {
      voteCntB++;
    } else if (total[i].vote == 'C') {
      voteCntC++;
    } else if (total[i].vote == 'D') {
      voteCntD++;
    } else if (total[i].vote == 'E') {
      voteCntE++;
    }
  }
  return [voteCntA, voteCntB, voteCntC, voteCntD, voteCntE];
};
