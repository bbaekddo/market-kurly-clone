const {pool} = require('../../../config/database');
const reviewDao = require('./reviewDao');

// 사용자 후기 조회
exports.getReview = async function (reviewId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const reviewResult = await reviewDao.selectReview(connection, reviewId);
    connection.release();
    
    return reviewResult[0];
};

// 게시글 ID로 사용자 후기 조회
exports.getReviewByPostId = async function (postId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const reviewByPostIdResult = await reviewDao.selectReviewByPostId(connection, postId);
    connection.release();
    
    return reviewByPostIdResult[0];
};