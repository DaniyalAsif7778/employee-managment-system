 import express from "express"

 const router = express.Router()


 router.route("/home").get( (req,res)=>{
    res.json("welcome to home page")
 })


 export  const userRouter = router;