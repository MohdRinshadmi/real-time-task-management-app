import jwt from 'jsonwebtoken';
import CommonSetting from '../models/commonSettings.js';
import logger from '../helper/logger.js';
import AccessKey from '../models/accessKey.js';

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

    return jwt.sign(tokenData, process.env.TOKEN_KEY, { expiresIn });
};

export const setJwtToken = async(accessToken, userId) => {
    const availableToken = await AccessKey.findOne({ where: { userId } });
    try {
        if (availableToken) {
            await availableToken.update({ token: accessToken, }, {},);
        } else {
            await AccessKey.create({ userId, token: accessToken, expiry: 1, }, {});
        }
    } catch (error) {
        logger.debug("error: ", error);
    }
};

export const verifyAppToken = async(token) => {
    return jwt.verify(token, process.env.APP_TOKEN_KEY);
};

