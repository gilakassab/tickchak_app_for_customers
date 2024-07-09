const { json } = require('express');
const pool = require('../DB.js');


async function getUser(id) {
  try {
    const sql = 'SELECT userName FROM users WHERE userId = ?';
    const result = await pool.query(sql, [id]);
      if (result[0].length > 0) {
          return result[0][0].userName;
      } else {
          throw new Error(`User with ID ${id} not found`);
      }
  } catch (err) {
      console.error('Error fetching user:', err);
      throw err;
  }
}


async function postUserLogin(userEmail) {
  try {
    console.log("userEmailB",userEmail);
    const sql = 'SELECT users.*, passwords.password FROM users NATURAL JOIN passwords  WHERE users.userEmail = ?';
    const result = await pool.query(sql, [userEmail])
    console.log("userEmail",result[0]);
    return result[0]; 
  } catch (err) {
    console.log(err);
    throw err; 
  }
}
async function checkEmailExists(userEmail) {
  try {
    const sql = 'SELECT userEmail FROM users  WHERE userEmail = ?';
    const result = await pool.query(sql, [userEmail])
    console.log(result[0])
    return result[0]; 
  } catch (err) {
    console.log(err);
    throw err; 
  }
}

async function postUserWithPwd(userName,passwords,userPhone,userEmail,roleId) {
  try {
    const sql1 = 'INSERT INTO users (userName,userPhone,userEmail,roleId) VALUES (?, ?, ?,?)';
    const userResult = await pool.query(sql1, [userName,userPhone,userEmail,roleId])
    const sql2 = 'INSERT INTO passwords (userId,password) VALUES (?,?)';
    const result = await pool.query(sql2, [userResult[0].insertId,passwords])
    return userResult[0].insertId; 
  } catch (err) {
    console.log(err);
    throw err; 
  }
}

// async function deleteUser(id) {
//   try {
//     const sql3 = 'DELETE FROM passwords WHERE user_id=?';
//     await pool.query(sql3, [id]);
//     const sql2 = 'DELETE FROM address WHERE id=?';
//     await pool.query(sql2, [id]);
//     const sql1 = 'DELETE FROM users WHERE id=?';
//     await pool.query(sql1, [id]);
//   } catch (err) {
//     console.log(err);
//     throw err; 
//   }
// }


async function postUser(userName,userPhone,userEmail) {
  try {
    const sql = 'INSERT INTO users (userName,userPhone,userEmail) VALUES (?, ?, ?)';
    const result = await pool.query(sql, [userName,userPhone,userEmail])
    return result[0].insertId; 
  } catch (err) {
    console.log(err);
    throw err; 
  }
}


module.exports = {postUser,postUserWithPwd,postUserLogin,checkEmailExists,getUser}
