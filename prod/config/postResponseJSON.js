async function createResponseJSON (itemResult) {
    // Response JSON 객체 생성
    let tempPostId;
    let tempPostObject = {};
    let itemListObject = {};
    let itemArrayResponse = [];
    const itemArray = itemResult[0];
    
    itemArray.forEach((element, index) => {
        // 첫 번째 게시글 데이터 저장
        if (index === 0) {
            tempPostId = element.post_id;
            tempPostObject.post_id = element.post_id;
            tempPostObject.image = element.image;
            tempPostObject.vendor = element.vendor;
            tempPostObject.title = element.title;
            tempPostObject.title_price = element.title_price;
            tempPostObject.intro = element.intro;
            tempPostObject.off = element.off;
            tempPostObject.item_list = [];
        }
        
        // 같은 게시글의 상품 옵션 저장
        if (element.post_id === tempPostId) {
            itemListObject.item_id = element.item_id;
            itemListObject.item_name = element.item_name;
            itemListObject.item_image = element.item_image;
            itemListObject.item_price = element.item_price;
            itemListObject.gift_enable = element.gift_enable;
            tempPostObject.item_list.push(itemListObject);
            itemListObject = {};
            
            // 마지막 상품일 경우 반환 객체에 입력
            if (index === itemArray.length - 1) {
                itemArrayResponse.push(tempPostObject);
            }
            // 다른 게시글을 저장할 경우
        } else {
            itemArrayResponse.push(tempPostObject);
            tempPostObject = {};
            
            tempPostId = element.post_id;
            tempPostObject.post_id = element.post_id;
            tempPostObject.image = element.image;
            tempPostObject.vendor = element.vendor;
            tempPostObject.title = element.title;
            tempPostObject.title_price = element.title_price;
            tempPostObject.intro = element.intro;
            tempPostObject.off = element.off;
            tempPostObject.item_list = [];
            
            itemListObject.item_id = element.item_id;
            itemListObject.item_name = element.item_name;
            itemListObject.item_image = element.item_image;
            itemListObject.item_price = element.item_price;
            itemListObject.gift_enable = element.gift_enable;
            tempPostObject.item_list.push(itemListObject);
            itemListObject = {};
            
            // 마지막 상품일 경우 반환 객체에 입력
            if (index === itemArray.length - 1) {
                itemArrayResponse.push(tempPostObject);
            }
        }
    });
    
    return itemArrayResponse;
}

module.exports = createResponseJSON;