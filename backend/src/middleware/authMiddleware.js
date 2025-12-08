import logger from "../helper/logger";
import { getFromDb, verifyAppToken } from "../utils/jwtToken";
import { errorMessage } from "../helper/response";


export default async(req, res, next) => {
    try {
        const token = req.headers["access-token"];
        if (!token) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const decoded 		= await verifyAppToken(token);
        let tokenFromDB 	= await getFromDb(decoded.id, decoded.pendingUser);
        tokenFromDB = tokenFromDB?.userTokens?.trim() || tokenFromDB?.mobileToken?.trim() || "";

        if (!tokenFromDB || tokenFromDB !== token) {
            let response = await errorMessage({ code: 1002 });
            return res.status(401).json(response);
        }
        delete decoded.iat;
        delete decoded.exp;
        req.auth = {
            user: decoded
        };
        return next();
    } catch (err) {
        logger.error("From mobile auth middlware:---", err);
        let response = await errorMessage({ code: 1076 });
        return res.status(401).json(response);
    }
};
