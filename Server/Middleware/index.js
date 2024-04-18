const jwt = require("jsonwebtoken");
const Secret = "S3CR3T";

const AuthenticateJwt = (req, res, next) => {
    const token = req.headers.auth;

    if (token) {
        jwt.verify(token, Secret, (err, user) => {
          if (err) {
            return res.sendStatus(403);
          }
          req.user = user;
          next();
        });
      } else {
        res.sendStatus(401);
      }
    };

module.exports = {
    AuthenticateJwt,
    Secret
};
