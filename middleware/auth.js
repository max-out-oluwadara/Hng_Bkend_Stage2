const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Organisation = require('../models/User')
require('dotenv').config();

//Define Our Middleware and Encode Our UderID
module.exports = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '');
        const token = req.header('x-auth-token');
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ where: { userId: decoded.userId } });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not Valid' });
    }
};