
import mongoose from "mongoose"
import {DB_NAME} from "../constant.js"
import {app} from "../app.js"

const connectDB = async ()=>{

try {
    const response = await mongoose.connect(
        `${process.env.MONGODB_URI}${DB_NAME}`
    )

        console.log(`MongoDB connected successfully ${response}`)
        app.on("error",(error)=>{
            console.log("error accour on connecting",error)
        })
        app.listen(process.env.PORT || 8000,(req,res)=>{
             console.log("app is listening at " , process.env.PORT)
        })
} catch (error) {
     
    console.log(error);
    
}


}


export {connectDB}