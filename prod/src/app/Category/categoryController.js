const categoryProvider = require('./categoryProvider');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require('../../../config/response');

// 1. 카테고리 목록 조회
exports.getCategories = async function (req, res) {
    const getCategoryResponse = await categoryProvider.getCategory();
    
    if (getCategoryResponse.length < 1) {
        return res.send(errResponse(baseResponse.CATEGORY_LIST_NOTHING));
    } else {
        return res.send(response(baseResponse.SUCCESS, getCategoryResponse));
    }
};

// 2. 카테고리별 상품 조회
exports.getCategoryItems = async function (req, res) {
    const {mainClass} = req.query;
    let {subClass} = req.query;
    
    // 빈 값 체크
    if (!mainClass) {
        return res.send(errResponse(baseResponse.CATEGORY_MAIN_CLASS_EMPTY));
    }
    
    // null 초기화
    if (!subClass) {
        subClass = null;
    }
    
    const getCategoryItemResponse = await categoryProvider.getCategoryItem(
        mainClass,
        subClass
    );
    
    // 반환된 배열이 없을 경우 에러
    if (getCategoryItemResponse.length < 1) {
        return res.send(errResponse(baseResponse.CATEGORY_SUBLIST_NOTHING));
    } else {
        return res.send(response(baseResponse.SUCCESS, getCategoryItemResponse));
    }
    
};