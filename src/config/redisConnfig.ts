import { Redis } from "ioredis";
import { Document } from "mongoose";

const redis = new Redis();


export const RedisSet = async (key: string, value: Document<any, any>[]) => {

    try {

    const stringifiedvalue = JSON.stringify(value);

    await redis.set(key, stringifiedvalue);
        
    } catch (error) {
        console.error(error);
        throw error
    }

  

}

export const RedisGet = async (key: string) => {

    try {

        const value = await redis.get(key);

        return value ? JSON.parse(value) : null;
        
    } catch (error) {
        console.error(error);
        throw error;
    }
 
}
