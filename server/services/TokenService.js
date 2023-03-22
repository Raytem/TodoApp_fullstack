import jwt from "jsonwebtoken"
import TokenModel from "../models/TokenModel.js"

class TokenService {
    
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "30d"});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            await tokenData.save();
            return tokenData;
        } else {
            const token = await TokenModel.create({userId, refreshToken});
            return token;
        }
    }

    async removeToken(refreshToken) {
        const token = await TokenModel.findOneAndDelete({refreshToken});
        return token;
    }

    validateAccessToken(accessToken) {
        try {
            const payloadDecoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            return payloadDecoded;
        } catch {
            return null;
        }
    }
    
    validateRefreshToken(refreshToken) {
        try {
            const payloadDecoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            return payloadDecoded;
        } catch {
            return null;
        }
    }

    async findToken(refreshToken) {
        const token = await TokenModel.findOne({refreshToken});
        return token;
    }
}

export default new TokenService();