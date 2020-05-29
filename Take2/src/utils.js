const jwt = require("jsonwebtoken");
const APP_SECRETE = "GraphQL-is-aw3some";

class Utils {
  getUserId(context) {
    const Auth = context.request.get("Authorization");

    if (Auth) {
      const token = Auth.replace("Bearer ", "");
      const { userId } = jwt.verify(token, APP_SECRETE);
      return userId;
    }
    throw Error("Not Authorized");
  }
}
module.exports = new Utils();
