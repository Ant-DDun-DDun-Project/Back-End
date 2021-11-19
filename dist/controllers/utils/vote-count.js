"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countVote = void 0;
//객관식 게시글 각 항목에 대한 투표수 계산 함수
const countVote = async (total) => {
    let [voteCntA, voteCntB, voteCntC, voteCntD, voteCntE] = [0, 0, 0, 0, 0]; //초기값 설정
    for (let i = 0; i < total.length; i++) {
        if (total[i].vote === 'A') {
            //A에 투표를 했으면
            voteCntA++; //A투표수 +1
        }
        else if (total[i].vote === 'B') {
            //B에 투표를 했으면
            voteCntB++; //B투표수 +1
        }
        else if (total[i].vote === 'C') {
            //C에 투표를 했으면
            voteCntC++; //C투표수 +1
        }
        else if (total[i].vote === 'D') {
            //D에 투표를 했으면
            voteCntD++; //D투표수 +1
        }
        else if (total[i].vote === 'E') {
            //E에 투표를 했으면
            voteCntE++; //E투표수 +1
        }
    }
    return [voteCntA, voteCntB, voteCntC, voteCntD, voteCntE]; //배열로 반환
};
exports.countVote = countVote;
//# sourceMappingURL=vote-count.js.map