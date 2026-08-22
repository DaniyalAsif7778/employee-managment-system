 import express from "express"
import { registerOrgnaization,loginAdmin,sendOTP } from "../controllers/orgnization/organization.controller.js";
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
      name:"org_coverImage",
      maxCount:1,
   }
])
   ,registerOrgnaization)

   router.route("/login").post(loginAdmin)
router.route("/sendEmail").post(sendOTP)
 export  const userRouter = router;