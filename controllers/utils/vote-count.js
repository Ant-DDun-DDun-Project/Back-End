//객관식 게시글 각 항목에 대한 투표수 계산 함수
exports.countVote = async (total) => {
  let [voteCntA, voteCntB, voteCntC, voteCntD, voteCntE] = [0, 0, 0, 0, 0];
  for (let i = 0; i < total.length; i++) {
    if (total[i].vote === 'A') {
      voteCntA++;
    } else if (total[i].vote === 'B') {
      voteCntB++;
    } else if (total[i].vote === 'C') {
      voteCntC++;
    } else if (total[i].vote === 'D') {
      voteCntD++;
    } else if (total[i].vote === 'E') {
      voteCntE++;
    }
  }
  return [voteCntA, voteCntB, voteCntC, voteCntD, voteCntE];
};
