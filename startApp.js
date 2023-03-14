import mongoose from "mongoose";

const PORT = 8081;
const DB_URL = "mongodb+srv://raytem:Dan124379@cluster0.pdgfacq.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

async function startApp(app) {
    try {
        await mongoose.connect(DB_URL);
        console.log("---Connected to DB")
        app.listen(PORT, () => console.log("---Server started on port:", PORT));
    } catch(e) {
        console.log(e);
        console.error("---Start error!");
    }
}

export default startApp;