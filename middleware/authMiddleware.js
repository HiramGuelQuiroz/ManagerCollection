import jwt from "jsonwebtoken";
import Ussers from "../models/Ussers.js";

const checkAuth = async (req,res,next) => {//next go to the next middleware (perfil) if we have problems with token
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))//cheking token
    {
        try {
            token = req.headers.authorization.split(" ")[1];//bearer is 0 1 is the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);//we obtain the three parts
            req.usser = await Ussers.findById(decoded.id).select("-password -token -confirm");
            return next();
        } catch (error) {
            const e = new Error('invalid token');
            return res.status(403).json({msg: e.message}); 
        }
    } 
    if (!token){//no valid token or no token
        const error = new Error('invalid or missing token');
        return res.status(403).json({msg: error.message});
    }
    next();
};

export default checkAuth;