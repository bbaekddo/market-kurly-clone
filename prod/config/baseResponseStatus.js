module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요" },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" },

    // User Request Error
    SIGNUP_ID_EMPTY : { "isSuccess": false, "code": 2001, "message":"ID를 입력해주세요" },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2002, "message":"비밀번호를 입력해주세요" },
    SIGNUP_NAME_EMPTY : { "isSuccess": false, "code": 2003, "message":"이름을 입력해주세요" },
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2004, "message":"이메일을 입력해주세요" },
    SIGNUP_PHONE_EMPTY : { "isSuccess": false, "code": 2005, "message":"휴대폰 번호를 입력해주세요" },
    SIGNUP_ID_LENGTH : { "isSuccess": false, "code": 2006, "message":"ID는 20자리 미만으로 입력해주세요" },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2007, "message":"비밀번호는 5자리 이상 20자리 미만으로 입력해주세요" },
    SIGNUP_NAME_LENGTH : { "isSuccess": false, "code": 2008, "message":"이름은 10자리 미만으로 입력해주세요" },
    SIGNUP_ID_ERROR_TYPE : { "isSuccess": false, "code": 2009, "message":"ID는 특수문자 없이 입력해주세요" },
    SIGNUP_NAME_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이름은 특수문자 없이 입력해주세요" },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2011, "message":"이메일 형식을 정확하게 입력해주세요" },

    SIGNIN_ID_EMPTY : { "isSuccess": false, "code": 2021, "message":"ID를 입력해주세요" },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2022, "message":"비밀번호를 입력해주세요" },
    SIGNIN_ID_LENGTH : { "isSuccess": false, "code": 2023, "message":"ID는 20자리 미만으로 입력해주세요" },
    SIGNIN_PASSWORD_LENGTH : { "isSuccess": false, "code": 2024, "message":"비밀번호는 5자리 이상 20자리 미만으로 입력해주세요" },
    SIGNIN_ID_ERROR_TYPE : { "isSuccess": false, "code": 2025, "message":"ID는 특수문자 없이 입력해주세요" },
    
    GET_INDEX_NOT_MATCH : { "isSuccess": false, "code": 2031, "message": "사용자 Index 값을 확인해주세요" },
    
    PATCH_INDEX_NOT_MATCH : { "isSuccess": false, "code": 2041, "message": "사용자 Index 값을 확인해주세요" },
    PATCH_PASSWORD_LENGTH : { "isSuccess": false, "code": 2042, "message":"비밀번호는 5자리 이상 20자리 미만으로 입력해주세요" },
    PATCH_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2043, "message":"이메일 형식을 정확하게 입력해주세요" },
    PATCH_ALL_PARAMETER_EMPTY : { "isSuccess": false, "code": 2044, "message":"변경할 사항이 없습니다" },
    
    DELETE_INDEX_NOT_MATCH : { "isSuccess": false, "code": 2051, "message": "사용자 Index 값을 확인해주세요" },
    
    // Item Request Error
    RANDOM_ITEM_DATE_EMPTY : { "isSuccess": false, "code": 2061, "message": "조회 날짜를 확인해주세요" },
    RANDOM_ITEM_DATE_ERROR_TYPE : { "isSuccess": false, "code": 2062, "message": "날짜 형식을 정확하게 입력해주세요" },
    
    DEAL_ITEM_DATE_EMPTY : { "isSuccess": false, "code": 2071, "message": "조회 날짜를 확인해주세요" },
    DEAL_ITEM_DATE_ERROR_TYPE : { "isSuccess": false, "code": 2072, "message": "날짜 형식을 정확하게 입력해주세요" },
    
    RECOMMEND_ITEM_DATE_EMPTY : { "isSuccess": false, "code": 2081, "message": "조회 날짜를 확인해주세요" },
    RECOMMEND_ITEM_DATE_ERROR_TYPE : { "isSuccess": false, "code": 2082, "message": "날짜 형식을 정확하게 입력해주세요" },
    
    RECOMMEND_CATEGORY_EMPTY : { "isSuccess": false, "code": 2091, "message": "카테고리를 확인해주세요" },
    RECOMMEND_CATEGORY_DATE_EMPTY : { "isSuccess": false, "code": 2091, "message": "조회 날짜를 확인해주세요" },
    RECOMMEND_CATEGORY_ERROR_TYPE : { "isSuccess": false, "code": 2093, "message": "카테고리 형식을 정확하게 입력해주세요" },
    RECOMMEND_CATEGORY_DATE_ERROR_TYPE : { "isSuccess": false, "code": 2094, "message": "날짜 형식을 정확하게 입력해주세요" },
    
    POST_ID_EMPTY : { "isSuccess": false, "code": 2101, "message": "게시글 ID를 확인해주세요" },
    
    DESCRIPTION_POST_ID_EMPTY : { "isSuccess": false, "code": 2111, "message": "게시글 ID를 확인해주세요" },
    
    SEARCH_TEXT_EMPTY : { "isSuccess": false, "code": 2121, "message": "검색할 텍스트가 없습니다" },
    SEARCH_TEXT_NOTHING : { "isSuccess": false, "code": 2122, "message": "검색 결과가 없습니다" },
    
    // Review Request Error
    REVIEW_ITEM_ID_EMPTY : { "isSuccess": false, "code": 2121, "message":"상품 ID를 입력해주세요" },
    REVIEW_TITLE_EMPTY : { "isSuccess": false, "code": 2122, "message":"후기 제목을 입력해주세요" },
    REVIEW_TITLE_LENGTH : { "isSuccess": false, "code": 2123, "message":"후기 제목은 30자리 미만으로 입력해주세요" },
    
    REVIEW_POST_ID_EMPTY : { "isSuccess": false, "code": 2131, "message":"게시글 ID를 입력해주세요" },
    REVIEW_POST_NOTHING : { "isSuccess": false, "code": 2132, "message":"조회할 상품 후기가 없습니다" },
    
    PATCH_REVIEW_ID_EMPTY : { "isSuccess": false, "code": 2141, "message":"사용자 후기 ID를 입력해주세요" },
    
    DELETE_REVIEW_ID_EMPTY : { "isSuccess": false, "code": 2151, "message":"사용자 후기 ID를 입력해주세요" },
    
    // Watchlist Request Error
    WATCHLIST_POST_ID_EMPTY : { "isSuccess": false, "code": 2161, "message":"게시글 ID를 입력해주세요" },
    
    DELETE_WATCHLIST_POST_ID_EMPTY : { "isSuccess": false, "code": 2171, "message":"게시글 ID를 입력해주세요" },
    
    // Basekt Request Error
    BASKET_ITEM_ID_EMPTY : { "isSuccess": false, "code": 2181, "message":"상품 ID를 입력해주세요" },
    BASKET_ITEM_QUANTITY_EMPTY : { "isSuccess": false, "code": 2182, "message":"상품 수량을 입력해주세요" },
    
    BASKET_ITEM_NOTHING : { "isSuccess": false, "code": 2191, "message":"현재 장바구니에 아무 상품도 없습니다" },
    
    PATCH_BASKET_ITEM_ID_EMPTY : { "isSuccess": false, "code": 2201, "message":"수정할 상품 ID를 입력해주세요" },
    PATCH_BASKET_QUANTITY_EMPTY : { "isSuccess": false, "code": 2202, "message":"수정할 상품 수량을 입력해주세요" },
    
    DELETE_BASKET_ITEM_ID_EMPTY : { "isSuccess": false, "code": 2211, "message":"삭제할 상품 ID를 입력해주세요" },
    
    // Order-List Request Error
    ORDERLIST_ORDER_EMPTY : { "isSuccess": false, "code": 2221, "message":"주문 목록을 입력해주세요" },
    ORDERLIST_PAY_EMPTY : { "isSuccess": false, "code": 2222, "message":"결제 수단을 입력해주세요" },
    
    ORDERLIST_ORDER_NOTHING : { "isSuccess": false, "code": 2231, "message":"현재 주문 목록이 없습니다" },
    
    PATCH_ORDERLIST_GROUP_EMPTY : { "isSuccess": false, "code": 2241, "message":"주문 그룹을 입력해주세요" },
    PATCH_ORDERLIST_STATUS_EMPTY : { "isSuccess": false, "code": 2242, "message":"변경 상태를 입력해주세요" },
    
    // Category Request Error
    CATEGORY_LIST_NOTHING : { "isSuccess": false, "code": 2251, "message":"카테고리 목록이 없습니다" },
    
    CATEGORY_MAIN_CLASS_EMPTY : { "isSuccess": false, "code": 2261, "message":"대분류를 입력해주세요" },
    CATEGORY_SUBLIST_NOTHING : { "isSuccess": false, "code": 2262, "message":"카테고리 목록이 없습니다" },
    
    
    // User Response error
    SIGNUP_REDUNDANT_ID : { "isSuccess": false, "code": 3001, "message":"중복된 ID 입니다" },

    SIGNIN_ID_WRONG : { "isSuccess": false, "code": 3011, "message": "ID가 잘못 되었습니다" },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3012, "message": "비밀번호가 잘못 되었습니다" },
    SIGNIN_STOP_ACCOUNT : { "isSuccess": false, "code": 3013, "message": "비활성화된 계정입니다. 고객센터에 문의해주세요" },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3014, "message": "탈퇴된 계정입니다. 고객센터에 문의해주세요" },
    
    PATCH_STOP_ACCOUNT : { "isSuccess": false, "code": 3021, "message": "비활성화된 계정입니다. 고객센터에 문의해주세요" },
    PATCH_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3022, "message": "탈퇴된 계정입니다. 고객센터에 문의해주세요" },
    
    DELETE_STOP_ACCOUNT : { "isSuccess": false, "code": 3031, "message": "비활성화된 계정입니다. 고객센터에 문의해주세요" },
    DELETE_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3032, "message": "탈퇴된 계정입니다. 고객센터에 문의해주세요" },
    
    // Item Response Error
    RANDOM_ITEM_NOTHING : { "isSuccess": false, "code": 3041, "message": "랜덤 추천 상품이 없습니다" },
    
    DEAL_ITEM_NOTHING : { "isSuccess": false, "code": 3061, "message": "일일 특가 상품이 없습니다" },
    
    RECOMMEND_ITEM_NOTHING : { "isSuccess": false, "code": 3071, "message": "MD 추천 상품이 없습니다" },
    
    RECOMMEND_CATEGORY_NOTHING : { "isSuccess": false, "code": 3081, "message": "MD 추천 상품이 없습니다" },
    
    POST_NOTHING : { "isSuccess": false, "code": 3091, "message": "상품 게시글이 없습니다" },
    
    DESCRIPTION_NOTHING : { "isSuccess": false, "code": 3101, "message": "상품 상세정보가 없습니다" },
    
    
    // Review Response Error
    PATCH_REVIEW_NOTHING : { "isSuccess": false, "code": 3111, "message": "후기 ID를 다시 확인해주세요." },
    PATCH_REVIEW_USER_INDEX_NOT_MATCH : { "isSuccess": false, "code": 3112, "message": "사용자와 후기 작성자가 일치하지 않습니다" },
    
    DELETE_REVIEW_NOTHING : { "isSuccess": false, "code": 3121, "message": "후기 ID를 다시 확인해주세요" },
    DELETE_REVIEW_USER_INDEX_NOT_MATCH : { "isSuccess": false, "code": 3122, "message": "사용자와 후기 작성자가 일치하지 않습니다" },
    
    // Watchlist Response Error
    WATCHLIST_REDUNDANT_POST : { "isSuccess": false, "code": 3131, "message":"이미 찜한 상품에 추가된 게시글입니다" },
    
    WATCHLIST_NOTHING : { "isSuccess": false, "code": 3141, "message":"찜한 상품이 없습니다" },
    
    DELETE_WATCHLIST_POST_NOTHING : { "isSuccess": false, "code": 3151, "message":"없는 게시글이거나 이미 찜한 상품에서 삭제된 게시글입니다" },
    
    // Basekt Response Error
    BASKET_REDUNDANT_ITEM : { "isSuccess": false, "code": 3161, "message":"이미 장바구니에 있는 상품입니다" },
    BASKET_TRANSACTION_ERROR : { "isSuccess": false, "code": 3162, "message":"DB 처리 중 에러가 발생했습니다" },
    
    PATCH_BASKET_NOTHING : { "isSuccess": false, "code": 3171, "message":"장바구니에 없는 상품입니다" },
    
    DELETE_BASKET_NOTHING : { "isSuccess": false, "code": 3181, "message":"장바구니에 없는 상품입니다" },
    
    // OrderList Response Error
    ORDERLIST_BASKET_ID_STOP : { "isSuccess": false, "code": 3191, "message":"구매가 불가능한 상품입니다. 다시 확인해주세요" },
    ORDERLIST_BASKET_ID_WITHDRAWAL : { "isSuccess": false, "code": 3192, "message":"판매가 중단된 상품입니다. 다시 확인해주세요" },
    ORDERLIST_BASKET_ID_NOT_MATCH : { "isSuccess": false, "code": 3193, "message":"장바구니 ID를 다시 확인해주세요" },
    ORDERLIST_BASKET_ID_WRONG : { "isSuccess": false, "code": 3194, "message":"현재 사용자가 갖고있는 장바구니 상품이 아닙니다" },
    ORDERLIST_BASKET_ITEM_QUANTITY_ZERO : { "isSuccess": false, "code": 3195, "message":"주문할 상품 수량이 0개 입니다. 다시 확인해주세요" },
    
    PATCH_ORDERLIST_NOTHING : { "isSuccess": false, "code": 3201, "message":"주문 목록 그룹을 다시 확인해주세요" },
    
    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
}
