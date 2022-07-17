const orderListProvider = require('./orderListProvider');
const orderListService = require('./orderListService');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require('../../../config/response');

// 1. 주문 목록 생성
exports.postOrderLists = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    const {orderList, pay} = req.body;
    
    // 빈 값 체크
    if (!orderList) {
        return res.send(errResponse(baseResponse.ORDERLIST_ORDER_EMPTY));
    }
    
    if (!pay) {
        return res.send(errResponse(baseResponse.ORDERLIST_PAY_EMPTY));
    }
    
    const postOrderListResponse = await orderListService.createOrderList(
        userIdx,
        orderList,
        pay
    );
    
    return res.send(postOrderListResponse);
};

// 2. 주문 목록 조회
exports.getOrderLists = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    
    const getOrderListResponse = await orderListProvider.getOrderList(userIdx);
    
    if (getOrderListResponse.length < 1) {
        return res.send(errResponse(baseResponse.ORDERLIST_ORDER_NOTHING));
    }
    
    return res.send(response(baseResponse.SUCCESS, getOrderListResponse));
};

// 3. 주문 목록 수정
exports.patchOrderLists = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    const group = req.params.orderGroup;
    const {status} = req.body;
    
    // 빈 값 체크
    if (!group) {
        return res.send(errResponse(baseResponse.PATCH_ORDERLIST_GROUP_EMPTY));
    }
    
    if (!status) {
        return res.send(errResponse(baseResponse.PATCH_ORDERLIST_STATUS_EMPTY));
    }
    
    const patchOrderListResponse = await orderListService.patchOrderList(
        userIdx,
        group,
        status
    );
    
    return res.send(patchOrderListResponse);
};