module.exports = function (app) {
    const review = require('./reviewController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    
    // 1. 사용자 후기 작성
    app.post('/reviews', jwtMiddleware, review.postReviews);
    
    // 2. 사용자 후기 조회
    app.get('/reviews', review.getReviews);
    
    // 3. 사용자 후기 수정
    app.patch('/reviews/:reviewId', jwtMiddleware, review.patchReviews);
    
    // 4. 사용자 후기 삭제
    app.delete('/reviews/:reviewId', jwtMiddleware, review.deleteReviews);
}