import { Vote } from '../../models'
import * as sequelize from 'sequelize'
import { VoteModel } from '../../models/votes';

export async function countAttend(): Promise<number> {
  //투표에 참여한 user을 뽑아옴(중복제거)
  try {
    const votes: VoteModel[] = await Vote.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('user')), 'vote']],
    });
    //투표에 참여한 user
    return votes.length; //투표에 참여한 user의 수를 반환한다.
  } catch (err) {
    console.error(err);
  }
}