const jwt = require('jsonwebtoken');
const User = require('../schemas/users');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(res.cookie)
  if (!authorization) {
    return res.status(401).send({
      errorMessage: 'Login Required'
    });
  }

  const [tokenType, tokenValue] = authorization.split(' ');

  if (!tokenValue || tokenType !== 'Bearer') {
    return res.status(401).send({
      errorMessage: 'Login Required',
    });
  }


  try {
    // Use the secret from the environment variables
    const { userId } = jwt.verify(tokenValue, process.env.JWT_SECRET || "2aibdoicndie777");
    // Find the user using the decoded userId
    const user = await User.findOne({ userId }).exec();
    
    if (!user) {
      return res.status(401).send({
        errorMessage: 'User not found. Please login again.',
      });
    }

    // Attach the user object to the response locals
    res.locals.user = user;

    // Call next() to proceed to the next middleware/route handler
    next();
    
  } catch (err) {
    return res.status(401).send({
      errorMessage: "Login Required",
    });
  }
};
