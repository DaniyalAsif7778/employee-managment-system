import express from "express";
import { userRouter } from "./routes/routes.js";

 export const app = express();
 


 app.use('/',userRouter)