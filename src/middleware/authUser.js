const jwt = require('jsonwebtoken')
require('dotenv').config()

const authUser = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiedUser) return res.status(401).send('Unauthorized request')
        
        req.user = verifiedUser;
        next();

    } else {
        return res.sendStatus(401);
    }
}

module.exports = authUser;