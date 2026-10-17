 import express from "express"
import { registerOrgnaization,sendOTP } from "../controllers/orgnization/organization.controller.js";
import { login, getCurrentUser, logout } from "../controllers/auth/auth.controller.js";
 import {upload} from "../middlewares/multer.middleware.js"
 const router = express.Router()


 router.route("/").get( (req,res)=>{
    res.json("welcome to home page")
 })

 router.route("/register-org").post(
upload.fields([
   {
      name:"avatar",
      maxCount:1,
   },
    {
      name:"org_avatar",
      maxCount:1,
   },
   {
      name:"org_CoverImage",
      maxCount:1,
   }
])
   ,registerOrgnaization)

   router.route("/login").post(login)
   router.route("/auth/me").get(getCurrentUser)
   router.route("/logout").post(logout)
router.route("/sendEmail").post(sendOTP)
 export  const userRouter = router;