const itemProvider = require('./itemProvider');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require('../../../config/response');

// 1. 랜덤 추천 상품 조회
exports.getRandomItems = async function (req, res) {
    const createDate = req.query.createDate;
    
    // 빈 값 체크
    if (!createDate) {
        return res.send(errResponse(baseResponse.RANDOM_ITEM_DATE_EMPTY));
    }
    
    // 형식 체크
    if (typeof createDate !== 'string') {
        return res.send(errResponse(baseResponse.RANDOM_ITEM_DATE_ERROR_TYPE));
    }
    
    const randomItemResponse = await itemProvider.getRandomItem(createDate);
    
    // 반환된 배열이 없을 경우 에러
    if (randomItemResponse.length < 1) {
        return res.send(errResponse(baseResponse.RANDOM_ITEM_NOTHING));
    } else {
        return res.send(response(baseResponse.SUCCESS, randomItemResponse));
    }
};

// 2. 일일 특가 상품 조회
exports.getDealItems = async function (req, res) {
    const createDate = req.query.createDate;
    
    // 빈 값 체크
    if (!createDate) {
        return res.send(errResponse(baseResponse.DEAL_ITEM_DATE_EMPTY));
    }
    
    // 형식 체크
    if (typeof createDate !== 'string') {
        return res.send(errResponse(baseResponse.DEAL_ITEM_DATE_ERROR_TYPE));
    }
    
    const dealItemResponse = await itemProvider.getDealItem(createDate);
    
    // 반환된 배열이 없을 경우 에러
    if (dealItemResponse.length < 1) {
        return res.send(errResponse(baseResponse.DEAL_ITEM_NOTHING));
    } else {
        return res.send(response(baseResponse.SUCCESS, dealItemResponse));
    }
};

// 3. MD 추천 상품 조회
exports.getRecommendItems = async function (req, res) {
    const createDate = req.query.createDate;
    
    // 빈 값 체크
    if (!createDate) {
        return res.send(errResponse(baseResponse.RECOMMEND_ITEM_DATE_EMPTY));
    }
    
    // 형식 체크
    if (typeof createDate !== 'string') {
        return res.send(errResponse(baseResponse.RECOMMEND_ITEM_DATE_ERROR_TYPE));
    }
    
    const recommendItemResponse = await itemProvider.getRecommendItem(createDate);
    
    // 반환된 배열이 없을 경우 에러
    if (recommendItemResponse.length < 1) {
        return res.send(errResponse(baseResponse.RECOMMEND_ITEM_NOTHING));
    } else {
        return res.send(response(baseResponse.SUCCESS, recommendItemResponse));
    }
};

// 4. MD 추천 상품 카테고리 조회
exports.getRecommendCategoryItems = async function (req, res) {
    const category = decodeURIComponent(req.params.category);
    const createDate = req.query.createDate;
    
    // 빈 값 체크
    if (!category) {
        return res.send(errResponse(baseResponse.RECOMMEND_CATEGORY_EMPTY));
    }
    
    if (!createDate) {
        return res.send(errResponse(baseResponse.RECOMMEND_CATEGORY_DATE_EMPTY));
    }
    
    // 형식 체크
    if (typeof category !== 'string') {
        return res.send(errResponse(baseResponse.RECOMMEND_CATEGORY_ERROR_TYPE));
    }
    
    if (typeof createDate !== 'string') {
        return res.send(errResponse(baseResponse.RECOMMEND_CATEGORY_DATE_ERROR_TYPE));
    }
    
    const recommendItemCategoryResponse = await itemProvider.getRecommendItemByCategory(
        category,
        createDate
    );
    
    // 반환된 배열이 없을 경우 에러
    if (recommendItemCategoryResponse.length < 1) {
        return res.send(errResponse(baseResponse.RECOMMEND_CATEGORY_NOTHING));
    } else {
        return res.send(response(baseResponse.SUCCESS, recommendItemCategoryResponse));
    }
};

// 5. 상품 게시글 조회
// -> 게시글 조회 삭제
/*exports.getPosts = async function (req, res) {
    const postId = Number(req.params.postId);
    
    // 빈 값 체크
    if (!postId) {
        return res.send(errResponse(baseResponse.POST_ID_EMPTY));
    }
    
    const postResponse = await itemProvider.getPost(postId);
    
    // 반환된 배열이 없을 경우 에러
    if (postResponse.length < 1) {
        return res.send(errResponse(baseResponse.POST_NOTHING));
    } else {
        return res.send(response(baseResponse.SUCCESS, postResponse));
    }
};*/


// 6. 상품 상세정보 조회
exports.getItemDescriptions = async function (req, res) {
    const postId = Number(req.query.postId);
    
    // 빈 값 체크
    if (!postId) {
        return res.send(errResponse(baseResponse.DESCRIPTION_POST_ID_EMPTY));
    }
    
    const descriptionResponse = await itemProvider.getItemDescription(postId);
    
    console.log(descriptionResponse);
    
    // 반환된 배열이 없을 경우 에러
    if (descriptionResponse.length < 1) {
        return res.send(errResponse(baseResponse.DESCRIPTION_NOTHING));
    } else {
        return res.send(response(baseResponse.SUCCESS, descriptionResponse));
    }
};

// 7. 상품 검색
exports.getSearch = async function (req, res) {
    const searchText = req.query.searchText;
    
    // 빈 값 체크
    if (!searchText) {
        return res.send(errResponse(baseResponse.SEARCH_TEXT_EMPTY));
    }
    
    const getSearchResponse = await itemProvider.getSearch(searchText);
    
    // 반환된 배열이 없을 경우 에러
    if (getSearchResponse.length < 1) {
        return res.send(errResponse(baseResponse.SEARCH_TEXT_NOTHING));
    } else {
        return res.send(response(baseResponse.SUCCESS, getSearchResponse));
    }
};