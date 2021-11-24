import * as Redis from 'ioredis';

// redis 연결 및 export
export const client = new Redis(6379, 'localhost');