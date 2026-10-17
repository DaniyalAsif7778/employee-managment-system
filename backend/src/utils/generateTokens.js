import { User } from '../models/auth/user.model.js'

export async function generateTokens(id, rememberMe = false) {
    const userWithTokens = await User.findById(id)
    if (!userWithTokens) throw new Error('Cannot issue tokens for a missing user')

    const accessToken = await userWithTokens.generateAccessToken()
    const refreshToken = await userWithTokens.generateRefreshToken(
        rememberMe ? '30d' : undefined
    )
    userWithTokens.refreshToken = refreshToken
    await userWithTokens.save({ validateBeforeSave: false })

    return { userWithTokens, accessToken, refreshToken }
}