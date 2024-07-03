// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const verifyJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization || req.headers.Authorization;
//     if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
//     const token = authHeader.split(' ')[1];
//     jwt.verify(
//         token,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             if (err) return res.sendStatus(403); //invalid token
//             req.user = decoded.UserInfo.username;
//             req.roles = decoded.UserInfo.roles;
//             next();
//         }
//     );
// }

// module.exports = verifyJWT

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const cookieToken = req.cookies.accessToken;
    console.log(cookieToken);

    // אם אין טוקן גישה תחזיר הודעת שגיאה
    if (!cookieToken) return res.status(401).json({ message: "Access token not found" });

    jwt.verify(
        cookieToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid token" });
            
            req.userId = decoded.userId;
            req.roleId =  decoded.Id;
            //req.isApproved = decoded.isApproved;
            return next();
        }
    );
};

module.exports = verifyJWT;