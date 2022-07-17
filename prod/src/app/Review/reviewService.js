const {logger} = require('../../../config/winston');
const {pool} = require('../../../config/database');
const reviewProvider = require('./reviewProvider');
const reviewDao = require('./reviewDao');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require('../../../config/response');

// 사용자 후기 생성
exports.createReview = async function (userIdx, item_id, title, content) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        const reviewResult = await reviewDao.insertReview(connection, userIdx, item_id, title, content);
        
        return response(baseResponse.SUCCESS, {'review_id': reviewResult[0].insertId});
    } catch (err) {
        logger.error(`App - createReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};

// 사용자 후기 수정
exports.patchReview = async function (userIdx, reviewId, title, content) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        // 후기 작성자 확인
        const reviewRows = await reviewProvider.getReview(reviewId);
        if (reviewRows.length < 1) {
            return errResponse(baseResponse.PATCH_REVIEW_NOTHING);
        }
        
        if (reviewRows[0].user_index !== userIdx) {
            return errResponse(baseResponse.PATCH_REVIEW_USER_INDEX_NOT_MATCH);
        }
        
        const oldInfoRows = [reviewRows[0].title, reviewRows[0].content];
        const newInfoRows = [title, content];
        await reviewDao.updateReview(connection, reviewId, oldInfoRows, newInfoRows);
        
        return response(baseResponse.SUCCESS, {'review_id': Number(reviewId)});
    } catch (err) {
        logger.error(`App - patchReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};

// 사용자 후기 삭제
exports.deleteReview = async function (userIdx, reviewId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        // 후기 작성자 확인
        const reviewRows = await reviewProvider.getReview(reviewId);
        if (reviewRows.length < 1) {
            return errResponse(baseResponse.DELETE_REVIEW_NOTHING);
        }
        
        if (reviewRows[0].user_index !== userIdx) {
            return errResponse(baseResponse.DELETE_REVIEW_USER_INDEX_NOT_MATCH);
        }
        
        await reviewDao.deleteReview(connection, reviewId);
        
        return response(baseResponse.SUCCESS, {'review_id': Number(reviewId)});
    } catch (err) {
        logger.error(`App - deleteReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};