const {pool} = require('../../../config/database');
const basketDao = require('./basketDao');

// 장바구니 조회
exports.getBasket = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const basketResult = await basketDao.selectBasket(connection, userIdx);
    connection.release();
    
    return basketResult[0];
};

// 장바구니 특정 조회
exports.getBasketCheck = async function (userIdx, itemId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const basketCheckResult = await basketDao.selectBasketCheck(connection, userIdx, itemId);
    connection.release();
    
    return basketCheckResult[0];
};