import { JWT_KEY } from "../config/config.js";
import {TokenDecode} from "../utility/tokenUtility.js"
export default (req, res, next) => {
    let token = req.headers['token'];
    let decode = TokenDecode(token);
    if(decode=== null){
       return res.status(200).json({"Message":"Unauthorize"})
    }else{
       // set user and email to header
       req.headers.email=decode.email;
       req.headers.user_id= decode.user_id;
        next()
    }
    
    
}