const Koa = require('koa');
const app = new Koa();
const Redis = require("ioredis");
const redis = new Redis({
  port: 6379, // Redis port
  host: "redis", // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: "auth",
  db: 0
});
const log4js = require('log4js');
log4js.configure({
  appenders: {
    cheeseLogs: { type: 'file', filename: 'cheese.log' },
    console: { type: 'console' }
  },
  categories: {
    cheese: { appenders: ['cheeseLogs'], level: 'debug' },
    another: { appenders: ['console'], level: 'trace' },
    default: { appenders: ['console', 'cheeseLogs'], level: 'trace' }
  }
});
const logger = log4js.getLogger('cheese');
// response
app.use(async ctx => {
  const count = await redis.incr('count');
  ctx.body = count;
  logger.info(`count: ${count}`)
});
 
app.listen(5000);
