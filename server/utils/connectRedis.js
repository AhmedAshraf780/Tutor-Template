// redisClient.js
import { createClient } from "redis";
import { config } from "../config/config.js";

let client;

export const connectRedis = async () => {
  if (!client) {
    client = createClient({
      username: config.REDIS_NAME,
      password: config.REDIS_PASSWORD,
      socket: {
        host: "redis-15407.c82.us-east-1-2.ec2.redns.redis-cloud.com",
        port: 15407,
      },
    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();
    console.log("✅ Redis Connected");
  }

  return client;
};

export const getRedisClient = () => {
  if (!client) {
    throw new Error(
      "Redis client is not connected yet. Call connectRedis first.",
    );
  }
  return client;
};
