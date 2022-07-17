const watchlistProvider = require('./watchlistProvider');
const watchlistService = require('./watchlistService');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require('../../../config/response');

// 1. 찜한 상품 추가
exports.postWatchlists = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    const {post_id} = req.body;
    
    // 빈 값 체크
    if (!post_id) {
        return res.send(errResponse(baseResponse.WATCHLIST_POST_ID_EMPTY));
    }
    
    const postWatchlistResponse = await watchlistService.createWatchlist(
        userIdx,
        post_id
    );
    
    return res.send(postWatchlistResponse);
};

// 2. 찜한 상품 조회
exports.getWatchlists = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    
    const getWatchlistResponse = await watchlistProvider.getWatchlist(
        userIdx
    );
    
    // 반환된 배열이 없을 경우 에러
    if (getWatchlistResponse.length < 1) {
        return res.send(errResponse(baseResponse.WATCHLIST_NOTHING));
    } else {
        return res.send(response(baseResponse.SUCCESS, getWatchlistResponse));
    }
};

// 3. 찜한 상품 삭제
exports.deleteWatchlists = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    const postId = req.params.postId;
    
    // 빈 값 체크
    if (!postId) {
        return res.send(errResponse(baseResponse.DELETE_WATCHLIST_POST_ID_EMPTY));
    }
    
    const deleteWatchlistResponse = await watchlistService.deleteWatchlist(
        userIdx,
        postId
    );
    
    return res.send(deleteWatchlistResponse);
}