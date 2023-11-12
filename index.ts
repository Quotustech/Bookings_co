import express, { NextFunction, Request, Response } from "express";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.ruote"
import queryRouter from "./routes/query.route"
import cors from "cors";
import morgan from "morgan";
import { AppError } from "./utils/appError";
import { errorHandler } from "./middlewares/error.middleware";
import { config } from "dotenv";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT;
const DB = process.env.DATABASE_URL;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1", queryRouter);


app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} path on the server`, 404));
});

app.use(errorHandler);

export { app, PORT, DB };
