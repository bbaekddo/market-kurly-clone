module.exports = function (app) {
    const watchlist = require('./watchlistController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    
    // 1. 찜한 상품 추가
    app.post('/watchlists', jwtMiddleware, watchlist.postWatchlists);
    
    // 2. 찜한 상품 조회
    app.get('/watchlists', jwtMiddleware, watchlist.getWatchlists);
    
    // 3. 찜한 상품 삭제
    app.delete('/watchlists/:postId', jwtMiddleware, watchlist.deleteWatchlists);
}