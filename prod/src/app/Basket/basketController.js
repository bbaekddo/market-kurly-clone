const basketProvider = require('./basketProvider');
const basketService = require('./basketService');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require('../../../config/response');

// 1. 장바구니 상품 추가
exports.postBaskets = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    const {item_list} = req.body;
    
    item_list.forEach((element, index) => {
        // 빈 값 체크
        if (!item_list[index].id) {
            return res.send(errResponse(baseResponse.BASKET_ITEM_ID_EMPTY));
        }
    
        if (!item_list[index].quantity) {
            return res.send(errResponse(baseResponse.BASKET_ITEM_QUANTITY_EMPTY));
        }
    });
    
    const postBasketResponse = await basketService.createBasket(
        userIdx,
        item_list
    );
    
    return res.send(postBasketResponse);
};

// 2. 장바구니 상품 조회
exports.getBaskets = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    
    const getBasketResponse = await basketProvider.getBasket(userIdx);
    
    if (getBasketResponse.length < 1) {
        return res.send(errResponse(baseResponse.BASKET_ITEM_NOTHING));
    } else {
        return res.send(response(baseResponse.SUCCESS, getBasketResponse));
    }
};

// 3. 장바구니 상품 수정
exports.patchBaskets = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    const itemId = req.params.itemId;
    const {quantity} = req.body;
    
    // 빈 값 체크
    if (!itemId) {
        return res.send(errResponse(baseResponse.PATCH_BASKET_ITEM_ID_EMPTY));
    }
    
    if (!quantity) {
        return res.send(errResponse(baseResponse.PATCH_BASKET_QUANTITY_EMPTY));
    }
    
    const patchBasketResponse = await basketService.patchBasket(
        userIdx,
        itemId,
        quantity
    );
    
    return res.send(patchBasketResponse);
};

// 4. 장바구니 상품 삭제
exports.deleteBaskets = async function (req, res) {
    const userIdx = req.verifiedToken.userIdx;
    const itemId = req.params.itemId;
    
    // 빈 값 체크
    if (!itemId) {
        return res.send(errResponse(baseResponse.DELETE_BASKET_ITEM_ID_EMPTY));
    }
    
    const deleteBasketResponse = await basketService.deleteBasket(
        userIdx,
        itemId
    );
    
    return res.send(deleteBasketResponse);
};