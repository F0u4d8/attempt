const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/envConfig")
class Authorisation {
    authorised(req, res, next) {
      const headerToken = req.headers.authorisation;
      if(headerToken) {
         const token = headerToken.split('Bearer ')[1];
         const verified = jwt.verify(token, JWT_SECRET);
         if(verified) {
             next();
         } else {
             return res.status(401).json({errors: [{msg: 'Please add a valid token'}]})
         }
      } else {
          return res.status(401).json({errors: [{msg: 'Please add a token'}]})
      }
    }
}
module.exports = new Authorisation();