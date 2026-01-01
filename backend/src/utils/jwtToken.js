import jwt from 'jsonwebtoken';
// import CommonSetting from '../models/commonSettings.js';
import logger from '../helper/logger.js';
import { AccessKey } from '../nosql/accessKey.js';
import { PendingRegistration } from '../nosql/pendingRegistration.js';

export const getJwtToken = async(tokenData) => {
    logger.info("Generating JWT token", tokenData);
    // TODO: Implement CommonSettings logic for MongoDB if needed
    let expiresIn = process.env.TOKEN_EXPIRY;

    return jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn });
};

export const setJwtToken = async(accessToken, userId) => {
    const availableToken = await AccessKey.findOne({ userId });
    logger.debug("Setting JWT token for userId:", userId);
    try {
        if (availableToken) {
            logger.debug("updating token for userId:", availableToken);
            availableToken.token = accessToken;
            await availableToken.save();
        } else {
            await AccessKey.create({ userId, token: accessToken, expiry: 1 });
        }
    } catch (error) {
        logger.debug("error: ", error);
    }
};

// Now checks AccessKey for the token (userId is actually the token string)
export const getFromDb = async(token) => {
    return await AccessKey.findOne({ where: { token } });
};


export const verifyAppToken = async(token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

