"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisGet = exports.RedisSet = void 0;
const ioredis_1 = require("ioredis");
const redis = new ioredis_1.Redis();
const RedisSet = async (key, value) => {
    try {
        const stringifiedvalue = JSON.stringify(value);
        await redis.set(key, stringifiedvalue);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.RedisSet = RedisSet;
const RedisGet = async (key) => {
    try {
        const value = await redis.get(key);
        return value ? JSON.parse(value) : null;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.RedisGet = RedisGet;
//# sourceMappingURL=redisConnfig.js.map