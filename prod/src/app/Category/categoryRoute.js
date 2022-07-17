module.exports = function (app) {
    const category = require('./categoryController');
    
    // 1. 카테고리 목록 조회
    app.get('/categories', category.getCategories);
    
    // 2. 카테고리별 상품 조회
    app.get('/categories/items', category.getCategoryItems);
}