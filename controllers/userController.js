const User = require('../models/User');

//@desc User get ther details
exports.getUserDetails = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      console.log(req.params.id)
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
      }
  
      res.status(200).json({
        status: 'success',
        message: 'User Information retrieved successfully',
        data: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (err) {
      console.error('Error retrieving user information');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
