import todoRouter from "./routers/todoRouter.js";
import express from "express";
import startApp from "./startApp.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import ApiError from "./exceptions/ApiError.js";
import configureDotEnvFile from "./utils/configureDotEnvFile.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRouter)
app.use('/todos', todoRouter);
app.use('/users', userRouter);

app.use( (req, res, next) => next(ApiError.PageNotFound()) );

//errorHandler
app.use(errorMiddleware);

configureDotEnvFile('dotenv.txt');
startApp(app);



