interface unsortedEither {
  eitherId?: number;
  title?: string;
  contentA?: string;
  contentB?: string;
  date?: string;
  completed?: boolean;
  edited?: boolean;
  editedDate?: string;
  likeCnt?: number;
  user?: number | string;
}

export function sortEither(unsortedPosts: unsortedEither[], posts_id: string): object[] {
  //정렬되지 않은 포스팅과 특정 찬반 고유id를 인자로 받음
  const either: object[] = []; //뒤에 붙일 찬반 포스팅을 담을 배열 생성
  // @ts-ignore
  while (unsortedPosts.length > 0 && unsortedPosts[0].eitherId != posts_id) {
    //잘못된 파라미터가 들어왔을때를 방지하기 위한 조건 (정렬되지 않은 포스팅 배열 length가 0보다 크고, 0번째 포스팅의 eitherId가 인자로 받은 고유id와 다르면)
    either.push(unsortedPosts.shift());
    //either 배열에 unsortedPosts의 가장 앞에있는 객체를 빼서 넣어줌
  }
  return [...unsortedPosts, ...either]; //순서가 unsortedPosts - either가 되도록 배열을 합침
}

