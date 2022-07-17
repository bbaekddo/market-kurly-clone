module.exports = function (app) {
    const orderList = require('./orderListController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    
    // 1. 주문 목록 생성
    app.post('/order-lists', jwtMiddleware, orderList.postOrderLists);
    
    // 2. 주문 목록 조회
    app.get('/order-lists', jwtMiddleware, orderList.getOrderLists);
    
    // 3. 주문 목록 수정
    app.patch('/order-lists/:orderGroup', jwtMiddleware, orderList.patchOrderLists);
}
