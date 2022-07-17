const {pool} = require('../../../config/database');
const orderListDao = require('./orderListDao');

// 주문 목록 조회
exports.getOrderList = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const orderListResult = await orderListDao.selectOrderList(connection, userIdx);
    connection.release();
    
    return orderListResult[0];
};

// 주문 목록 그룹 조회
exports.getOrderListGroup = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const orderListGroupResult = await orderListDao.selectOrderListGroup(connection, userIdx);
    connection.release();
    
    return orderListGroupResult[0];
};

// 사용자 Index와 그룹 번호로 주문 목록 조회
exports.getOrderListCheck = async function (userIdx, group) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const orderListCheckResult = await orderListDao.selectOrderListCheck(connection, userIdx, group);
    connection.release();
    
    return orderListCheckResult[0];
};

// 장바구니 조회
exports.getBasket = async function (basketId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const basketResult = await orderListDao.selectBasket(connection, Number(basketId));
    connection.release();
    
    return basketResult[0];
};

// 장바구니 상태 조회
exports.getBasketStatus = async function (basketId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const basketStatusResult = await orderListDao.selectBasketStatus(connection, Number(basketId));
    connection.release();
    
    return basketStatusResult[0];
};