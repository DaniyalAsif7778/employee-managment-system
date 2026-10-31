import { Queue } from 'bullmq';
import process from 'process';

const redisOptions = {
    host: process.env.REDIS_HOST || '127.0.0.1', // Defaults to your own server
    port: parseInt(process.env.REDIS_PORT || '6379', 10)
};

// Create and export the single email queue instance
export const emailQueue = new Queue('EmailQueue', {
    connection: redisOptions
});
