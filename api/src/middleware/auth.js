const jwt = require('jsonwebtoken');
const config = require("../routes/config");


module.exports  = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.secret);
    console.log(decodedToken);

    if (token>0) {
      console.log(token);
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};


