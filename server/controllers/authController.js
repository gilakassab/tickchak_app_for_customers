const model = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleLogin = async (userName, password) => {
    if (!userName || !password) {
        return null;
    }

    const foundUser = await model.postUserLogin(userName, password);
    if (!foundUser) {
        return null; // Unauthorized
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const role = foundUser.roleId;
        const accessToken = jwt.sign(
            { "userInfo": {
                userName: foundUser.username,
                userRole: role
            } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        return accessToken;
    } else {
        return null;
    }
}


module.exports = { handleLogin };
// const accessToken = jwt.sign(
//     {
//         userId: user.id,
//         roleId: user.roleId,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: "5m" }
// );
// res.cookie("accessToken", accessToken, {
//     httpOnly: true,
//     sameSite: "None",
//     secure: true,
// });

// res.status(201).send(user);
// }
// } catch (error) {
// res.status(500).send({ error: 'Failed to fetch book' });
// }
// });

// module.exports = loginRouter;
// השמירה של הcookie