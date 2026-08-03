import express from "express";
import { userRouter } from "./routes/routes.js";

 export const app = express();
 app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended:true, limit:"20kb"}))

 app.use('/api/v1/ems',userRouter)