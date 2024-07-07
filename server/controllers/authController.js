const model = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const handleLogin = async (userEmail, password) => {
  console.log(userEmail + " " + password);
  if (!userEmail || !password) {
    return null;
  }

  const foundUser = await model.postUserLogin(userEmail);
  if (!foundUser) {
    return null; // Unauthorized
  }

  const user = foundUser[0];

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (hashedPassword === user.password) {
    const role = user.roleId;
    const accessToken = jwt.sign(
      {
        userInfo: {
          userId: user.userId,
          userEmail: user.userEmail,
          userRole: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    return {
      accessToken,
      user: {
        id: user.userId,
        userName: user.userName,
        userPhone: user.userPhone,
        userEmail: user.userEmail,
        roleId: user.roleId,
        // Include any other user details you want to return
      },
    };
  } else {
    return null;
  }
};

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
