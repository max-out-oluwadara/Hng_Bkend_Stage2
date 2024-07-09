const jwt = require('jsonwebtoken');
const User = require('../models/User')
require('dotenv').config();

//Define Our Middleware and Encode Our UserId
module.exports = async (req, res, next) => {
    try {
        
        const token = req.header('x-auth-token');

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
          }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ where: { userId: decoded.userId } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid token: user not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not Valid' });
    }
};