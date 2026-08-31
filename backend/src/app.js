import express from "express";
import { userRouter } from "./routes/routes.js";
import cookieParser from "cookie-parser" 
import cors from "cors"
import process from "process"
export const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

 app.use(express.json({limit: "30kb"}))
app.use(express.urlencoded({extended:true, limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

 app.use('/api/v1/ems',userRouter)