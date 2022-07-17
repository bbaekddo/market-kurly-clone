module.exports = function (app) {
    const basket = require('./basketController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    
    // 1. 장바구니 상품 추가
    app.post('/baskets', jwtMiddleware, basket.postBaskets);
    
    // 2. 장바구니 상품 조회
    app.get('/baskets', jwtMiddleware, basket.getBaskets);
    
    // 3. 장바구니 상품 수정
    app.patch('/baskets/:itemId', jwtMiddleware, basket.patchBaskets);
    
    // 4. 장바구니 상품 삭제
    app.delete('/baskets/:itemId', jwtMiddleware, basket.deleteBaskets);
}