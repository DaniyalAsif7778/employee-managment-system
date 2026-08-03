 import express from "express"
import { registerOrgnaization } from "../service/organization/organization.service.js";

 const router = express.Router()


 router.route("/home").get( (req,res)=>{
    res.json("welcome to home page")
 })

 router.route("/register-org").post(registerOrgnaization)

 export  const userRouter = router;