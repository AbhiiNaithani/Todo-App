const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

function userAuth(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(' ');
    const actualToken = words[1];
    try{
        jwt.verify(actualToken, JWT_SECRET);
        next();
    }
    catch(e){
        res.status(403).json({
            msz : `User dosen't exist`
        });
    }
}

module.exports = userAuth;