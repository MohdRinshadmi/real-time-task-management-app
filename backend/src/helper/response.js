import errorCode from "./errorCode.js";

export const successMessage = async(req) => {
      console.log('req.datattataa', req.data);
    return {
        data : { status: true, data: req.data },
        code: 200
    };
};

export const errorMessage = async(req) => {
    console.log('req.codeeee', req.code);
    
    const error = {
        code : req.code,
        description : errorCode[`${req.code}`],
    };
    return {
        data : {
            status: false, data: error,
        },
        code: req.statusCode
    };
};

