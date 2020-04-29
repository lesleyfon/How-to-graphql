const jwt = require("jsonwebtoken");
const APP_SECRETE = "GraphQL-is-aw3some";


class Utils {

    getUserId(context) {
        const Auth = context.request.get("Authorization");
      
        console.log("\n", Auth, "\n")
        if(Auth){
          const token = Auth.replace("bearer ", "");
          const { userId } = jwt.verify(token, APP_SECRETE);
          return userId;
        }
        throw Error("Not Authorized")
      }
      
 }
 module.exports = new Utils();