import express from "express";
import { userRouter } from "./routes/routes.js";
import cookieParser from "cookie-parser" 
export const app = express();
 app.use(express.json({limit: "30kb"}))
app.use(express.urlencoded({extended:true, limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

 app.use('/api/v1/ems',userRouter)