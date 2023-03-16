import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8080;

mongoose.set('strictQuery', false);

async function startApp(app) {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("---Connected to DB")
        app.listen(PORT, () => console.log("---Server started on port:", PORT));
    } catch(e) {
        console.log(e);
        console.error("---Start error!");
    }
}

export default startApp;