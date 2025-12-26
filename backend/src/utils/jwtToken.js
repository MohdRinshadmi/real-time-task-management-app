import jwt from 'jsonwebtoken';
import CommonSetting from '../models/commonSettings.js';
import logger from '../helper/logger.js';
import AccessKey from '../models/accessKey.js';
import PendingRegistration from '../models/pendingRegistration.js';

export const getJwtToken = async(tokenData) => {
    logger.info("Generating JWT token", tokenData);
    const time = await CommonSetting.findOne({
        where:{ id:1, active:1 }
    });
    let expiresIn;
    if (time && time.logoutTime) {
        const logoutTimeMs = time.logoutTime;

        if (logoutTimeMs >= 3600000) {
            expiresIn = `${Math.floor(logoutTimeMs / 3600000)}h`;
        } else if (logoutTimeMs >= 60000) {
            expiresIn = `${Math.floor(logoutTimeMs / 60000)}m`;
        }
    } else {
        expiresIn = process.env.TOKEN_EXPIRY;
    }

    return jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn });
};

export const setJwtToken = async(accessToken, userId) => {
    const availableToken = await AccessKey.findOne({ where: { userId } });
    logger.debug("Setting JWT token for userId:", userId);
    try {
        if (availableToken) {
            logger.debug("updating token for userId:", availableToken);
            await availableToken.update({ token: accessToken, }, {},);
        } else {
            await AccessKey.create({ userId, token: accessToken, expiry: 1, }, {});
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

