require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function validateJwt(request, response, next) {
   const accessToken = request.header("x-auth-token");

   if (!accessToken) {
      return response.status(401).json({ authError: "no token provided" });
   }

   try {
      const decodedPayload = jwt.verify(
         accessToken,
         process.env.JWT_ACCESS_SECRET
      );
      request.user = decodedPayload;

      next();
   } catch {
      return response.status(401).json({ authError: "Unauthorized token" });
   }
};
