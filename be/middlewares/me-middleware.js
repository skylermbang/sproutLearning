const jwt = require('jsonwebtoken');
const User = require('../schemas/users');
require('dotenv').config();


module.exports = async (req, res, next) => {
  // Retrieve the token from cookies
  const token = req.cookies.authToken;


  // Check if token exists
  if (!token) {
    return res.status(402).send({
      errorMessage: 'Login Required no token',
    });
  }

  try {
    // Verify the token
    const { userId } = jwt.verify(token, process.env.JWT_SECRET || '2aibdoicndie777');
    console.log(userId);

    // Find the user using the decoded userId
    const user = await User.findOne({ userId }).exec();
    
    if (!user) {
      return res.status(403).send({
        errorMessage: 'User not found. Please login again.',
      });
    }

    // Attach the user object to the response locals
    res.locals.user = user;

    // Proceed to the next middleware/route handler
    next();
    
  } catch (err) {
    return res.status(409).send({
      errorMessage: 'Login Required', text: err
    });
  }
};
