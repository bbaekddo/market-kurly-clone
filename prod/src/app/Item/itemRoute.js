module.exports = function (app) {
    const item = require('./itemController');
    
    // 1.랜덤 추천 상품 조회
    app.get('/random-items', item.getRandomItems);
    
    // 2. 일일 특가 상품 조회
    app.get('/deal-items', item.getDealItems);
    
    // 3. MD 추천 상품 전체 조회
    app.get('/recommend-items', item.getRecommendItems);
    
    // 4. MD 추천 상품 카테고리 조회
    app.get('/recommend-items/:category', item.getRecommendCategoryItems);
    
    // 5. 상품 게시글 조회
    // app.get('/posts/:postId', item.getPosts);
    
    // 6. 상품 상세정보 조회
    app.get('/items', item.getItemDescriptions);
    
    // 7. 상품 검색
    app.get('/search', item.getSearch);
}