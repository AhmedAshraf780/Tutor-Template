import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { RedisStore } from "connect-redis";
import rateLimit from "express-rate-limit";

/*
 *    Custom module
 * */

import { config } from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import connectMongo from "./utils/connectDB.js";
import { connectRedis, getRedisClient } from "./utils/connectRedis.js";
import authMiddleWare from "./middleware/auth.middleware.js";
import checkExpiration from "./middleware/checkExpiration.js";

const app = express();

/*
 *     Connecting databases
 * */

const redisClient = getRedisClient();
const loginRate = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per IP
  message: {
    success: false,
    message: "Too many login attempts, try again later",
  },
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: config.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // TODO: make sure to make it true in production
      httpOnly: true,
      // sameSite: "lax",
      maxAge: 8 * 60 * 60 * 1000,
    },
  }),
);

app.use(express.json());
app.use(helmet());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true, // allow cookies to be sent
  }),
);

app.use("/", authRoutes);
app.use("/student", authMiddleWare(), checkExpiration(), studentRoutes);
app.use("/admin", authMiddleWare(), checkExpiration(), adminRoutes);

app.listen(config.PORT, async () => {
  console.log(`listening on port ${config.PORT}`); // Fixed typo in "listenning"
  await connectMongo();
  await connectRedis();
});
