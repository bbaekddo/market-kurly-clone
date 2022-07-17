const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const userDao = require("./userDao");

exports.getUserByIdx = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const userResult = await userDao.selectUserByIdx(connection, userIdx);
    connection.release();
    
    return userResult[0];
};

exports.getUserById = async function (id) {
  const connection = await pool.getConnection(async (conn) => conn);
  
  const userByIdResult = await userDao.selectUserById(connection, id);
  connection.release();
    
  return userByIdResult[0];
};

exports.passwordCheck = async function (id) {
  const connection = await pool.getConnection(async (conn) => conn);
  
  const passwordCheckResult = await userDao.selectUserPassword(connection, id);
  connection.release();
  
  return passwordCheckResult[0];
};

exports.statusCheck = async function (id) {
  const connection = await pool.getConnection(async (conn) => conn);
  
  const userStatusResult = await userDao.selectUserStatus(connection, id);
  connection.release();

  return userStatusResult[0];
};

exports.statusCheckByIdx = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const userStatusResult = await userDao.selectUserStatusByIdx(connection, userIdx);
    connection.release();
    
    return userStatusResult[0];
};

exports.getOldInfos = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const oldInfosResult = await userDao.selectUserInfos(connection, userIdx);
    connection.release();
    
    return oldInfosResult[0];
};