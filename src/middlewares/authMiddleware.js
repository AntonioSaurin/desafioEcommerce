const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error: 'Token nao enviado!'});
    }

    const [, token] = authHeader.split(' ');

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decoded.id;

        return next();
    }catch(error){
        return res.status(401).json({error: 'Token invalidado ou expirado!'});
    }
}

module.exports = authMiddleware;