# baseImage 세팅
FROM node:14

WORKDIR /Back-End
ADD . /Back-End

# package.json 을 컨테이너 안으로 넣어주는 작업
COPY package.json ./
COPY tsconfig.json ./
COPY .env ./

# 추가적으로 필요한 파일들을 다운로드 받는다.
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN apt-get update
RUN apt-get install -y mysql-server
RUN apt-get install -y redis-server
RUN npm install
RUN npm install -g pm2
RUN npx tsc

# 터미널 시작시 시작될 명령어
CMD ["pm2-runtime", "process.json"]

EXPOSE 3000