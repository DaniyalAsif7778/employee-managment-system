import dotenv from "dotenv"
import dns from 'dns';

import {connectDB} from "./db/db.js"
dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config({
    path:"./env"
})


  connectDB()