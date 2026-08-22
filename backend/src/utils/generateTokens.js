import { User } from "../models/user.models.js";

export async  function generateTokens(id) {

    const userWithTokens = await User.findById(id)
     
    const refreshToken = await   userWithTokens.generateAccessToken()
    const accessToken = await  userWithTokens.generateRefreshToken()
    userWithTokens.refreshToken = refreshToken;
   await  userWithTokens.save({validateBeforeSave:true})

    return {userWithTokens,refreshToken,accessToken}
}  