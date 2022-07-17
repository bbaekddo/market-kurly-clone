const reviewProvider = require('./reviewProvider');
const reviewService = require('./reviewService');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require('../../../config/response');

// 1. 사용자 후기 작성
exports.postReviews = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    const {item_id, title} = req.body;
    let {content} = req.body;
    
    // 빈 값 체크
    if (!item_id) {
        return res.send(errResponse(baseResponse.REVIEW_ITEM_ID_EMPTY));
    }
    
    if (!title) {
        return res.send(errResponse(baseResponse.REVIEW_TITLE_EMPTY));
    }
    
    // 길이 체크
    if (title.length > 30) {
        return res.send(errResponse(baseResponse.REVIEW_TITLE_LENGTH));
    }
    
    // null 초기화
    if (!content) {
        content = null;
    }
    
    const postReviewResponse = await reviewService.createReview(
        userIdx,
        item_id,
        title,
        content
    );
    
    return res.send(postReviewResponse);
};

// 2. 사용자 후기 조회
exports.getReviews = async function (req, res) {
    const postId = req.query.postId;
    
    if (!postId) {
        return res.send(errResponse(baseResponse.REVIEW_POST_ID_EMPTY));
    }
    
    const reviewResponse = await reviewProvider.getReviewByPostId(postId);
    
    // 반환된 배열이 없을 경우 에러
    if (reviewResponse.length < 1) {
        return res.send(errResponse(baseResponse.REVIEW_POST_NOTHING));
    } else {
        res.send(response(baseResponse.SUCCESS, reviewResponse));
    }
};

// 3. 사용자 후기 수정
exports.patchReviews = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    const reviewId = req.params.reviewId;
    let {title, content} = req.body;
    
    // 빈 값 체크
    if (!reviewId) {
        return res.send(errResponse(baseResponse.PATCH_REVIEW_ID_EMPTY));
    }
    
    // null 초기화
    if (!title) {
        title = null;
    }
    
    if (!content) {
        content = null;
    }
    
    const patchReviewResponse = await reviewService.patchReview(
        userIdx,
        reviewId,
        title,
        content
    );
    
    return res.send(patchReviewResponse);
};

// 4. 사용자 후기 삭제
exports.deleteReviews = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    const reviewId= req.params.reviewId;
    
    // 빈 값 체크
    if (!reviewId) {
        return res.send(errResponse(baseResponse.DELETE_REVIEW_ID_EMPTY));
    }
    
    const deleteReviewResponse = await reviewService.deleteReview(userIdx, reviewId);
    
    return res.send(deleteReviewResponse);
};