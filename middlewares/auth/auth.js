const customError = require('..//../helpers/error/CustomError')
const jwt = require('jsonwebtoken')
const { isTokenInclueded, getAccessTokenFromHeader } = require('../../helpers/authorization/tokentest');
const CustomError = require('..//../helpers/error/CustomError');
const getAccessToRoute = function (req, res, next) {
    //Token
    const { JWT_SECRET_KEY } = process.env;
    if (!isTokenInclueded(req)) {
        return next(new customError("You are not authorized to access to access this route",400))
    };
    const accessToken = getAccessTokenFromHeader(req);
    jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            return next(new CustomError("You are not authorized ",400))
        }
        req.user={
            id:decoded.id,
            fname:decoded.fname
        };
        
        next();
    })

}


module.exports = {
    getAccessToRoute
}