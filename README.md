# 💻개미들의곡소리 - Backend

<a href="https://www.antsori.com"><img src="https://user-images.githubusercontent.com/86486778/144210068-e7ae76fd-db3f-466c-8886-c2198f63c4c2.png" style="width:500px;"></a>

## 🏠 [Home Page Link](https://www.antsori.com)

<hr>
<br>

## 🗂️ 목차

### 1. [프로젝트 소개](#-프로젝트-소개)

### 2. [팀 구성](#-팀-구성)

### 3. [기술 스텍](#-기술스택-why)

### 4. [라이브러리](#-라이브러리-why)

### 5. [주요 기능](#️-주요-기능)

### 6. [아키텍쳐](#-백엔드-아키텍처)

### 7. [최종 성과](#최종-성과)

### 8. [trouble-shooting](#배운점-or-trouble-shooting)

<hr>
<br>

## 📈 프로젝트 소개

#### 주식하는 개미들의 투표기반 커뮤니티!

- 📚 무거운 고민들을 쉽고 가볍게 해결할 수 있는
- 📉 곡소리 나는 개미들의 주식 커뮤니티,
- 📈 투표를 통해 당신의 생각을 여러 개미들과 자유롭게 나눠보세요!

<br> 

## 🗓 프로젝트 기간

- 2021년 10월 23일 ~ 2021년 12월 03일

<br>

## 🧑‍💻 팀 구성

[팀 소개 페이지](https://crawling-health-e0d.notion.site/be6df84bde484ca883f54739be96eb8f)

<table>
  <tr>
  <td colspan='2' align="center">
  Backend
  </td>
  <td colspan='2' align="center">
  Frontend
  </td>
  <td colspan='2' align="center">
  Designer
  </td>
  <tr>
  <td align="center"><img src="https://crawling-health-e0d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F56d2808d-73f7-47d9-b580-310b311774f0%2FUntitled.png?table=block&id=dae3a277-b892-4185-9dc1-2b9fd53605e9&spaceId=e0735ea4-78ca-47db-be31-3e9c8641e938&width=260&userId=&cache=v2" width="60px;" alt=""/>
    </td>
    <td align="center" >
    <b>김정호</b></a><br>
    <a href="https://github.com/jeangho293">Github</a>
    <br><img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/><br>
    </td>
    <td align="center"><img src="https://crawling-health-e0d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4cd551ad-0c09-4ef8-8027-b9e3d47a79e8%2FUntitled.png?table=block&id=493a20f5-e908-4ef8-b07d-710d2f42f3f9&spaceId=e0735ea4-78ca-47db-be31-3e9c8641e938&width=260&userId=&cache=v2" width="60px;" alt=""/>
    </td>
    <td align="center">
    <b>김갑민</b></a><br />
    <a href="https://github.com/gabmin" >Github</a>
    <br><img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/><br>
    </td>
    <td align="center"><img src="https://crawling-health-e0d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd266d37c-2c38-4f03-b50f-c7908dabf868%2FUntitled.png?table=block&id=ebb3a525-c75c-4f30-974a-629f8818f109&spaceId=e0735ea4-78ca-47db-be31-3e9c8641e938&width=260&userId=&cache=v2" width="60px;" alt=""/>
    </td>
    <td align="center">
    <b>김예은</b></a><br />
    </td>
    <tr>
    <td align="center"><img src="https://crawling-health-e0d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2f229f59-5b48-4501-b9d8-44395fa066ab%2FUntitled.png?table=block&id=65bb4f7a-a244-4ba9-85e9-1886dc98432b&spaceId=e0735ea4-78ca-47db-be31-3e9c8641e938&width=260&userId=&cache=v2" width="60px;" alt=""/>
    </td>
    <td align="center">
    <b>조윤재</b></a><br /> 
    <a href="https://github.com/Yunjaejo">Github</a>
    <br><img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/><br>
    </td>
    <td align="center"><img src="https://crawling-health-e0d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F651ce4da-3dd7-4845-8207-bcb564eb641d%2FUntitled.png?table=block&id=9973b5b1-8ec8-4d30-a7da-64d453e1da16&spaceId=e0735ea4-78ca-47db-be31-3e9c8641e938&width=260&userId=&cache=v2" width="60px;" alt=""/>
    </td>
    <td align="center">
    <b>박시영</b></a><br /> 
    <a href="https://github.com/larisms">Github</a>
    <br><img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/><br>
    </td>
    <td align="center"><img src="https://crawling-health-e0d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcd2c4a8c-5a95-41e0-9053-9897e4c95a1b%2FUntitled.png?table=block&id=d4cdb94a-8915-455e-af65-6f98d33dc665&spaceId=e0735ea4-78ca-47db-be31-3e9c8641e938&width=260&userId=&cache=v2" width="60px;" alt=""/>
    </td>
    <td align="center">
    <b>김한비</b></a><br /> 
    </td>
    </tr>
    <tr>
    <td align="center"><img src="https://crawling-health-e0d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd36d536e-0432-4cb0-96ef-9a1c3a1889d5%2FUntitled.png?table=block&id=8b7efded-cc3e-45e9-a950-724957fe55cd&spaceId=e0735ea4-78ca-47db-be31-3e9c8641e938&width=260&userId=&cache=v2" width="60px;" alt=""/>
    </td>
    <td align="center">
    <b>황창환</b></a><br /> 
    <a href="https://github.com/changchanghwang">Github</a>
    <br><img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/><br>
    </td>
    <td align="center"><img src="https://crawling-health-e0d.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F828d0f28-79c9-407a-83da-6ba55ce7fbe4%2FUntitled.png?table=block&id=3d63dc23-b006-47f5-8191-65e9cc1350d8&spaceId=e0735ea4-78ca-47db-be31-3e9c8641e938&width=260&userId=&cache=v2" width="60px;" alt=""/>
    </td>
    <td align="center">
    <b>장원배</b></a><br /> 
    <a href="https://github.com/calvin9150">Github</a>
    <br><img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/><br>
    </td>
    <td colspan='2'></td>
    </tr>
</table>

<br>

## 🛠 기술스택 ([WHY?](https://spark-stove-6bf.notion.site/cf6de263fec844ba8c989b4c9a6dd32e))

기술스택 | 설명
---|:---:
Node.js | 자바스크립트 런타임
Express | 웹 프레임워크
TypeScript | 타입스크립트
MySQL | MySQL
Redis | Redis
Jenkins | CI/CD 툴
Nginx | Proxy 서버
Docker | Docker

<br>

## 📖 라이브러리 ([WHY?](https://spark-stove-6bf.notion.site/9064e96f94854aaca56925f80d978bdb))

라이브러리 | 설명
---|:---:
<img src='https://img.shields.io/badge/artillery-1.7.9-lightgrey'> | 서버 부하 테스트
<img src='https://img.shields.io/badge/bcrypt-5.0.1-lightgrey'> | 비밀번호 암호화
<img src='https://img.shields.io/badge/compression-1.7.4-lightgrey'>  | 데이터 압축
<img src='https://img.shields.io/badge/cors-2.8.5-lightgrey'> | 교차 리소스 공유
<img src='https://img.shields.io/badge/dotenv-10.0.0-lightgrey'>  | 환경변수 관리
<img src='https://img.shields.io/badge/express-4.17.1-lightgrey'> | 서버
<img src='https://img.shields.io/badge/express--rate--limit-5.5.1-lightgrey'> | 요청 횟수 제한
<img src='https://img.shields.io/badge/helmet-4.6.0-lightgrey'>  | HTTP 헤더 보안
<img src='https://img.shields.io/badge/ioredis-17.4.1-lightgrey'>  | redis 연결
<img src='https://img.shields.io/badge/joi-17.4.1-lightgrey'>  | 입력데이터 검출
<img src='https://img.shields.io/badge/jest-27.3.1-lightgrey'>  | 테스트 코드
<img src='https://img.shields.io/badge/jsonwebtoken-8.5.1-lightgrey'>  | 서명 암호화
<img src='https://img.shields.io/badge/moment-2.29.1-lightgrey'> | 날짜 라이브러리
<img src='https://img.shields.io/badge/morgan-1.10.0-lightgrey'> | Http Log 기록
<img src='https://img.shields.io/badge/mysql-2.3.2-lightgrey'> | MySQL
<img src='https://img.shields.io/badge/node--schedule-2.0.0-lightgrey'> | 스케쥴 업무 자동화
<img src='https://img.shields.io/badge/request--ip-2.1.3-lightgrey'> | client ip 요청
<img src='https://img.shields.io/badge/sequelize-6.7.0-lightgrey'>  | MySQL ORM
<img src='https://img.shields.io/badge/sequelize--cli-6.2.0-lightgrey'> | MySQL ORM Console
<img src='https://img.shields.io/badge/swagger--ui--express-4.1.6-lightgrey'> | API 문서화
<img src='https://img.shields.io/badge/ts--node-10.4.0-lightgrey'> | TypeScript 실행
<img src='https://img.shields.io/badge/tsc--watch-10.4.0-lightgrey'> | TypeScript 실행(watch)
<img src='https://img.shields.io/badge/typescript-4.4.4-lightgrey'> | TypeScript
<img src='https://img.shields.io/badge/winston-3.3.3-lightgrey'> | Log 파일 생성
<img src='https://img.shields.io/badge/winston--daily--rotate--file-4.5.5-lightgrey'> | Log 파일 관리

<br>

## 🕹️ 주요 기능

### 로그인 / 회원가입

- 영문 소문자, 숫자, 특수기호를 이용하여 아이디와 비밀번호를 설정할 수 있다.
- 닉네임을 입력할 수 있으며, 커뮤니티를 이용하는 모든 곳엔 닉네임만 노출된다.

### 찬반 / 객관식 인기글

- 투표 참여자 수가 가장 많은 게시글 10개를 슬릭 슬라이더 방식으로 순서대로 보여준다.
- 화면에 크기에 따라 최대 4개씩 게시글을 보여주고 넘길 수 있다.
- 원하는 게시물을 클릭하면 해당 게시물의 메인 뷰 혹은 상세페이지로 이동할 수 있다.

### 검색

- 검색어를 입력하면 검색어가 포함된 모든 게시글을 리스트 형식으로 보여준다.
- 최신순으로 정렬되어 내림차순으로 게시글을 보여준다.
- Pagination 기능을 추가하여 페이지당 최대 10개의 게시물을 보여준다.
- 원하는 게시물을 클릭하면 해당 게시물의 메인 뷰 혹은 상세페이지로 이동할 수 있다.

### 프로필 페이지

- 닉네임 변경 기능을 추가하여 아이디 중복검사 후 언제든지 닉네임을 변경할 수 있다.
- 자신이 작성한 글과 참여한 글을 리스트 형식으로 최신순, 내림차순으로 정렬되어 보여준다.
- Pagination 기능을 추가하여 페이지당 최대 10개의 게시물을 보여준다.
- 원하는 게시물을 클릭하면 해당 게시물의 메인 뷰 혹은 상세페이지로 이동할 수 있다.

### 찬반 투표

- 어떠한 이야기 혹은 고민에 대해 두 가지의 선택지 중 하나를 선택할 수 있다.
- 전체 게시물, 진행 중인 게시물, 종료된 게시물을 선택해서 볼 수 있다.
- 슬릭 슬라이더 방식과 리스트 방식 두 가지 형태가 존재하며, 원하는 방식으로 보고 이용할 수 있다.
- 리스트 형식은 Pagination 기능이 있어 페이지당 최대 5개의 게시물을 볼 수 있다.
- 하나의 선택지를 선택하면 즉시 투표 결과를 Progress Bar 형식으로 보여준다.
- 언제든지 재투표가 가능하며 그에 따라 투표 결과가 바로 반영된다.
- 작성자의 프로필을 클릭하면 해당 프로필 페이지로 이동할 수 있다.
- '좋아요' 기능이 존재하여 관심 있는 게시글에 한 번만 '좋아요'를 할 수 있다.

### 객관식 투표

- 어떠한 이야기 혹은 고민에 대해 최대 5개의 선택지 중 하나를 선택할 수 있다.
- 전체 게시물, 진행 중인 게시물, 종료된 게시물을 선택해서 볼 수 있다.
- 슬릭 슬라이더 방식과 리스트 방식 두 가지 형태가 존재하며, 원하는 방식으로 보고 이용할 수 있다.
- 리스트 형식은 Pagination 기능이 있어 페이지당 최대 5개의 게시물을 볼 수 있다.
- 하나의 게시물을 선택하면 상세페이지로 넘어가고 투표를 진행할 수 있다.
- 해당 게시물에 대해 댓글을 작성할 수 있으며 수정, 삭제, '좋아요' 가 가능하다.
- 다른 유저가 작성한 댓글에 대댓글을 작성할 수 있다.
- 댓글 리스트에 Pagination 기능이 있어 페이지당 최대 5개의 댓글을 볼 수 있다.
- 작성자의 프로필을 클릭하면 해당 프로필 페이지로 이동할 수 있다.
- '좋아요' 기능이 존재하여 관심 있는 게시글에 한 번만 '좋아요'를 할 수 있다.

<hr>

<br>

## 🧱 백엔드 아키텍처

![architecture](https://user-images.githubusercontent.com/86486778/144437335-63dc92ca-555d-4d9a-adc3-5ccc4dc3f50c.png)

<br>

## 🧾 Serverside Flow Chart

![API](https://user-images.githubusercontent.com/86486778/144233426-407e657b-b7fe-4558-8146-4dc692f7e7f7.jpg)

<br>

## 🐜 DB ERD

![ERD](https://user-images.githubusercontent.com/86486778/144221872-508e5c65-43e5-4540-983c-25230964aae5.png)
<br>

<br> 

## 📂 [Project Notion](https://crawling-health-e0d.notion.site/Project-3b911ebdb6114fb7be4b54956a9579dd)

<br>

## ✍ Code Convention

- api url : dash case
- model : camel case
- file : dash case
- 변수 : lower case camel case
- function: camel case, 동사+명사

<br>

## 🐱 Git Rule

- 선빵필승. 뒤에 commit하는사람이 conflict 해결해서 commit하기
- commit convention
  - feat : 새로운 기능 추가
  - fix : 버그 수정
  - edit : 기능 수정
  - docs : 문서 수정
  - style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
  - refactor : 코드 리팩토링
  - test : 테스트 코드, 리팩토링 테스트 코드 추가
  - chore : 빌드 업무 수정, 패키지 매니저 수정
  - merge: pull 받은 후 바로 푸시를 해야될 경우
  - mig: migration
  - 제목은 50자 미만, 문장의 끝에 마침표 넣지 않음. 과거 시제 사용하지 않고, 명령어로 작성하도록 함.
  - 제목 외에 추가적으로 정보를 전달하고 싶을 경우 본문에 추가 정보 기입
  > 예시 : [feat] comment router CRUD 기능 추가 :  본인 이름
- 각 기능 브랜치에서 작업 후 push —> develop 브랜치에 merge는 pull requests를 통해서 하기.
  - 모든 pull requests는 팀원들의 확인 후 merge
  - 이슈가 생길 시 issue 탭 활용

<br>

## 최종 성과

<img src="https://user-images.githubusercontent.com/86486778/144451851-c3a4a905-f7ab-4003-8028-6ccf611ae58e.png" width="300px">
<img src ="https://user-images.githubusercontent.com/86486778/144452071-7ad6e083-e561-4eeb-8647-89ede8ac650e.png" width="300px" height="200px">



<img src="https://user-images.githubusercontent.com/86486778/144451657-7d34f9fa-27b1-4b5d-8a96-a541c363e9ad.png" width="300px">

- redis hyperloglog를 이용한 일일 방문자 집계
- 광고 게시 5일간 방문자 수 총 1197명, 투표참여 수 1214회
- 121개의 게시글 작성
- 설문조사시 높은 만족도

#### 시간적 여유가 부족한 개인투자자들이 의견을 나눌 수 있는 쉽고 간편한 투표 커뮤니티라는 기획이 적중하여 만들어낸 결과라고 생각

<br>

## ❗트러블 슈팅

### 1. VPC

  - **어떤 문제점을 겪었는가?**
    
    Elastic Cache를 사용하여 Redis를 구성 후 **다른 AWS 계정**으로 Elastic Cache에 접근했을 때. `Connection Error` 발생하는 이슈

  - **왜 이런 문제가 발생했는가?**
  
    Elastic Cache는 RDS와는 다르게 **동일한 VPC 내부에서만 경우에 접근이 가능**하다.
    
    즉 서로 다른 AWS 계정은 서로 다른 VPC에 속하기 때문이다.
  
  - **어떻게 해결했는가?**

    ![image](https://user-images.githubusercontent.com/84619866/144468346-5eb12e8b-66e7-4dd4-8216-aa66326e0586.png)
    `VPC Peering` 라는 기능을 AWS에서 제공을 해준다. 이 기능은 서로 다른 AWS 계정끼리 VPC를 공유할 수 있게 해준다.
    
    추가적으로 같은 `가용 영역`에 존재할 경우 `무료`요금이다. 신청자가 VPC Peering을 요청하면 수락자가 요청을 받고, 라우팅 테이블을 설정 후, 보안그룹(인바운드 규칙)을 설정해준다.  
  
    VPC Peering 설정은 AWS 공식 문서에 정리가 잘 되어있다.
    > 참고문헌:https://docs.aws.amazon.com/ko_kr/vpc/latest/peering/working-with-vpc-peering.html
### 2. CI/CD


### 3. Nginx

  - **어떤 문제점을 겪었는가?**

    ![image](https://user-images.githubusercontent.com/84619866/144455878-e89d7d5a-487a-495f-8999-9e7a815f172c.png)

    위와 같은 그림으로 EC2 서버의 Port 단위로 부하를 분산하는 인프라로 구성하였다.

    그러나 실제 부하테스트를 진행한 결과 **node 1개로 수행했을 때와 node 2개로 수행했을 경우 차이가 없었다**.

  - **왜 이런 문제가 발생했는가?**

    위와 같은 그림으로는 만약 100개의 요청이 왔을 때, 요청을 분담하여 처리할 뿐 EC2 하나가 처리해야할 요청의 총량이 줄어드는 것이 아니다.

  - **어떻게 해결했는가?**

    ![image](https://user-images.githubusercontent.com/84619866/144456517-cd066b1b-8a9a-4cbc-882d-dd8c44705a06.png)

    Reverse Proxy를 로드 밸런서의 역할로도 사용하며 요청을 각각의 서버에 분산처리하도록 설계하였다.

    - 결과

      ![image](https://user-images.githubusercontent.com/84619866/144453387-0ab81c66-0d82-419a-8db7-69fb0f91baaf.png)

### 4. Promise.all

  - **어떤 문제점을 겪었는가?**

    - 변경 전 코드
      ```javascript
       ...
      const either = await sequelize.query(mainQuery.getMainForEither(), { type:QueryTypes.SELECT });
      const multi = await sequelize.query(mainQuery.getMainForMulti(), { type:QueryTypes.SELECT });
      const [eitherNum, multiNum] = await countPosting();
      const attendNum = await countAttend();
       ```
      위와 같이 코드를 구현할 경우, 해당 API 부하테스트 결과 최대 응답시간이 9초로 매우 느린 성능을 보여주었다.
  - **왜 이런 문제가 발생했는가?**

    ![image](https://user-images.githubusercontent.com/84619866/144460615-b3295b13-9f92-4b5d-822f-95ca344437f3.png)

    위와 같이 연속적인 비동기 처리를 할 경우, async-await 함수를 **하나하나 기다리므**로 소요 시간이 오래 걸린다.

  - **어떻게 해결했는가?**

    ![image](https://user-images.githubusercontent.com/84619866/144461227-3fc34121-44f7-4fec-b7ca-ceb39ab6f318.png)
  
    결과적으로 말하면 Promise.all 을 사용하였다. Promise.all 은 서로 영향을 끼치지 않는, 즉 **독립적으로 수행되는 비동기 함수를 병렬처리**해준다.
    
    그림으로보면 총 걸린 시간은 가장 오래걸린 수행 시간 3초로 `총 소요시간 = 가장 오래걸린 함수 시간` 이다.
    
    - 변경 후 코드
      ```javascript
      const [either, multi, [eitherNum, multiNum], attendNum]: [
        MainEither[],
        MainMulti[],
        number[],
        number
      ] = await Promise.all([
        //Promise.all로 각각의 데이터들(찬반투표 포스팅, 객관식 포스팅, 찬반투표 포스팅갯수, 객관식 포스팅갯수, 참여자수)를 병렬적으로 받아온다.
        sequelize.query(mainQuery.getMainForEither(), { type: QueryTypes.SELECT }),
        sequelize.query(mainQuery.getMainForMulti(), { type: QueryTypes.SELECT }),
        countPosting(),
        countAttend(),
      ]);
      ```
    > 그림 참고:https://code-masterjung.tistory.com/91