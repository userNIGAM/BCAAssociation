import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
import adminRoute from "./routes/adminRoute.js"

dotenv.config()

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json())
app.use(cors({
    credentials : true
}))

app.use("/api/admin",adminRoute)

connectDb();
app.listen(PORT, ()=>{
    console.log(`Server is Running On http://localhost:${PORT}`)
})