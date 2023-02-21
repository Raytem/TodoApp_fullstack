import todoRouter from "./routers/todoRouter.js";

import express from "express";
import mongoose from "mongoose";


const app = express();
const PORT = 8080;

const DB_URL = "mongodb+srv://raytem:Dan124379@cluster0.pdgfacq.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todos', todoRouter);

app.use((req, res) => res.status(404).end('Page Not Found'));

startApp();

//---------------

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        console.log("---Connected to DB")
        app.listen(8080, () => console.log("---Server started on port:", PORT));
    } catch(e) {
        console.log(e);
        console.error("---Start error!");
    }
}



