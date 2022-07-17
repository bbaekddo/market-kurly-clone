const {logger} = require('../../../config/winston');
const {pool} = require('../../../config/database');
const watchlistProvider = require('./watchlistProvider');
const watchlistDao = require('./watchlistDao');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require('../../../config/response');

// 찜한 상품 추가
exports.createWatchlist = async function (userIdx, postId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        const watchlistRows = await watchlistProvider.getWatchlistCheck(userIdx, postId);
        if (watchlistRows.length > 0) {
            return errResponse(baseResponse.WATCHLIST_REDUNDANT_POST);
        }
        
        const watchlistResult = await watchlistDao.insertWatchlist(connection, userIdx, postId);
        
        return response(baseResponse.SUCCESS, {'watchlist_id': watchlistResult[0].insertId});
    } catch (err) {
        logger.error(`App - createWatchlist Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};

// 찜한 상품 삭제
exports.deleteWatchlist = async function (userIdx, postId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        const watchlistRows = await watchlistProvider.getWatchlistCheck(userIdx, postId);
        if (watchlistRows.length < 1) {
            return errResponse(baseResponse.DELETE_WATCHLIST_POST_NOTHING);
        }
        
        await watchlistDao.deleteWatchlist(connection, userIdx, postId);
        
        return response(baseResponse.SUCCESS, {'post_id': Number(postId)});
    } catch (err) {
        logger.error(`App - deleteWatchlist Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};