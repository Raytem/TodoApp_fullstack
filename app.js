import todoRouter from "./routers/todoRouter.js";
import express from "express";
import startApp from "./startApp.js";
import userRouter from "./routers/userRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todos', todoRouter);
app.use('/users', userRouter);

app.use((req, res) => res.status(404).end('Page Not Found'));

startApp(app);



