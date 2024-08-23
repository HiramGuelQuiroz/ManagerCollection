import jwt from "jsonwebtoken";

const generateJWT = (id) => {//.sign create new jwt
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "5d",//just 5 days
    });
};

export default generateJWT;