const {pool} = require('../../../config/database');
const watchlistDao = require('./watchlistDao');

// 찜한 상품 조회
exports.getWatchlist = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const watchlistResult = await watchlistDao.selectWatchlist(connection, userIdx);
    connection.release();
    
    return watchlistResult[0];
};

// 찜한 상품 특정 조회
exports.getWatchlistCheck = async function (userIdx, postId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const watchlistCheckResult = await watchlistDao.selectWatchlistCheck(connection, userIdx, postId);
    connection.release();
    
    return watchlistCheckResult[0];
}