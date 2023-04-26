const jwt = require('jsonwebtoken');

// Middleware function that verifies if a valid token is present in the request headers
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
     // Verifies the token using the JWT_SECRET and calls the callback function with the decoded token
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(401).json('Token is not valid!');
        req.user = user;
        next();
      
    });
  } else {
    return res.status(401).json("You're not authenticated!");
  }
};

// Middleware function that verifies if the authenticated user is authorized to access a particular resource

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
     // If the authenticated user ID matches with the requested user ID or the authenticated user is an admin, call the next middleware function

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};
// Middleware function that verifies if the authenticated user is an admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
     // If the authenticated user is an admin, call the next middleware function
   
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not allowed to do that!');
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
