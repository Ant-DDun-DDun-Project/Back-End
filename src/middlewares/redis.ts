import * as Redis from 'ioredis';

// redis 연결 및 export
export const client = new Redis(Number(process.env.REDIS_PORT), process.env.REDIS_HOST);