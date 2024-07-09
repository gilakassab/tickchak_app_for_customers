const { json } = require("express");
const pool = require("../DB.js");

async function getUser(id) {
  try {
    const sql = "SELECT userName FROM users WHERE userId = ?";
    const result = await pool.query(sql, [id]);
    if (result[0].length > 0) {
      return result[0][0].userName;
    } else {
      throw new Error(`User with ID ${id} not found`);
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
}

async function postUserLogin(userEmail) {
  try {
    const sql =
      "SELECT users.*, passwords.password FROM users NATURAL JOIN passwords  WHERE users.userEmail = ?";
    const result = await pool.query(sql, [userEmail]);

    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function checkEmailExists(userEmail) {
  try {
    const sql = "SELECT userEmail FROM users  WHERE userEmail = ?";
    const result = await pool.query(sql, [userEmail]);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function postUserWithPwd(
  userName,
  passwords,
  userPhone,
  userEmail,
  roleId
) {
  try {
    const sql1 =
      "INSERT INTO users (userName,userPhone,userEmail,roleId) VALUES (?, ?, ?,?)";
    const userResult = await pool.query(sql1, [
      userName,
      userPhone,
      userEmail,
      roleId,
    ]);
    const sql2 = "INSERT INTO passwords (userId,password) VALUES (?,?)";
    const result = await pool.query(sql2, [userResult[0].insertId, passwords]);
    return userResult[0].insertId;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function postUser(userName, userPhone, userEmail, userRole) {
  try {
    const sql =
      "INSERT INTO users (userName,userPhone,userEmail,roleId) VALUES (?, ?, ?,?)";
    const result = await pool.query(sql, [
      userName,
      userPhone,
      userEmail,
      userRole,
    ]);
    return result[0].insertId;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  postUser,
  postUserWithPwd,
  postUserLogin,
  checkEmailExists,
  getUser,
};
