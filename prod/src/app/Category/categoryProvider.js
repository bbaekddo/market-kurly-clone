const {pool} = require('../../../config/database');
const categoryDao = require('./categoryDao');
const responseJSON = require('../../../config/postResponseJSON');

// 카테고리 목록 조회
exports.getCategory = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const categoryArray = await categoryDao.selectCategory(connection);
    connection.release();
    
    let tempMain;
    let subClassArray = [];
    let subClassCount = 1;
    let subClassObject = {};
    let categoryObject = {};
    categoryArray[0].forEach((element, index) => {
        // 첫 번째 main class
        if (index === 0) {
            tempMain = element.main_class;
        }
        
        // main class, sub class를 반환 객체에 입력
        if (element.main_class === tempMain) {
            subClassArray.push(element.sub_class);
            
            // 마지막 index일 때 처리
            if (index === categoryArray[0].length - 1) {
                subClassArray.forEach(j => {
                    subClassObject['subClass' + subClassCount] = j;
                    subClassCount++;
                });
                categoryObject[tempMain] = subClassObject;
            }
        // 순회 중 main class가 바뀌었을 때
        } else {
            subClassArray.forEach(j => {
                subClassObject['subClass' + subClassCount] = j;
                subClassCount++;
            });
            categoryObject[tempMain] = subClassObject;
            
            // main class 재설정, sub class 배열 및 객체 초기화
            tempMain = element.main_class;
            subClassCount = 1;
            subClassObject = {};
            subClassArray = [];
            
            subClassArray.push(element.sub_class);
        }
    });
    
    return categoryObject;
};

// 카테고리별 상품 조회
exports.getCategoryItem = async function (mainClass, subClass) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const categoryItemResult = await categoryDao.selectCategoryItem(connection, mainClass, subClass);
    connection.release();
    
    return responseJSON(categoryItemResult);
};
