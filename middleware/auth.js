const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = function (req, res, next) {
    //Get Token from header
    const token = req.header('x-auth-token');


    //Check if not token
    if(!token) {
        return res.status(401).json({ message: 'No token, authorization denied '});
    }

    try {
        //Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //Attach user from payload to request
        req.user = decoded.user;

        //Call the next middleware or route handler
        next();
    } catch (err){
        res.status(401).json({message:"Token is not Valid"});
    }  

}