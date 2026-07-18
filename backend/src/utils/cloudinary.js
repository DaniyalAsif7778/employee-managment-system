import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: 'bt6qbbjk', 
    api_key: '631264554424554', 
    api_secret: '<your_api_secret>'
})



const uploadOnCloudinary = async (localFilePath)=>{
 
    
 
 try {

if (!localFilePath) return; 
 

    const response =  await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
    })
    console.log(response,"operation successfull")

    fs.unlinkSync(localFilePath)
    return response;
 

 }catch(error){
    console.log("asset upload process failed")
    fs.unlinkSync(localFilePath)
 }

    
}