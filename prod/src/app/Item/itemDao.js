// 랜덤 추천 상품 조회
async function selectRandomItem (connection, createDate) {
    const selectRandomItemQuery = `
        SELECT P.id AS post_id, PI.data AS image, V.name AS vendor, title, title_price, intro, off,
               I.id AS item_id, I.name AS item_name, II.data AS item_image, price AS item_price, gift_enable
        FROM  random_items AS RI, items AS I, item_images AS II, posts AS P, post_images AS PI, vendors AS V
        WHERE RI.post_id = P.id AND
            II.item_id = I.id AND
            I.post_id = P.id AND
            P.image_id = PI.id AND
            P.vendor_id = V.id AND
            (RI.create_at >= ? AND RI.create_at < DATE_ADD(?, INTERVAL 1 DAY));
    `;
    const params = [createDate, createDate];
    return await connection.query(selectRandomItemQuery, params);
}

// 일일 특가 상품 조회
async function selectDealItem (connection, createDate) {
    const selectDealItemQuery = `
        SELECT P.id AS post_id, PI.data AS image, V.name AS vendor, title, title_price, intro, off,
               I.id AS item_id, I.name AS item_name, II.data AS item_image, price AS item_price, gift_enable
        FROM deal_items AS DI, items AS I, item_images AS II, posts AS P, post_images AS PI, vendors AS V
        WHERE DI.post_id = P.id AND
            II.item_id = I.id AND
            I.post_id = P.id AND
            P.image_id = PI.id AND
            P.vendor_id = V.id AND
            (DI.create_at >= ? AND DI.create_at < DATE_ADD(?, INTERVAL 1 DAY));
    `;
    const params = [createDate, createDate];
    return await connection.query(selectDealItemQuery, params);
}

// MD 추천 상품 전체 조회
async function selectRecommendItem (connection, createDate) {
    const selectRecomendItemQuery = `
        SELECT P.id AS post_id, PI.data AS image, V.name AS vendor, title, title_price, intro, off,
               I.id AS item_id, I.name AS item_name, II.data AS item_image, price AS item_price, gift_enable
        FROM recommend_items AS RI, items AS I, item_images AS II, posts AS P, post_images AS PI, vendors AS V
        WHERE RI.post_id = P.id AND
            II.item_id = I.id AND
            I.post_id = P.id AND
            P.image_id = PI.id AND
            P.vendor_id = V.id AND
            (RI.create_at >= ? AND RI.create_at < DATE_ADD(?, INTERVAL 1 DAY));
    `;
    const params = [createDate, createDate];
    return await connection.query(selectRecomendItemQuery, params);
}

// MD 추천 상품 조회
async function selectRecommendItemByCategory (connection, category, createDate) {
    let selectRecommendItemQuery = ``;
    let params = [];
    if (category === '선물하기') {
        selectRecommendItemQuery = `
            SELECT P.id AS post_id, PI.data AS image, V.name AS vendor, title, title_price, intro, off,
                   I.id AS item_id, I.name AS item_name, II.data AS item_image, price AS item_price, gift_enable
            FROM items AS I, item_images AS II, posts AS P, post_images AS PI, vendors AS V,
                 categories AS C
            WHERE II.item_id = I.id AND
                I.post_id = P.id AND
                I.category_id = C.id AND
                P.image_id = PI.id AND
                P.vendor_id = V.id AND
                I.gift_enable = 1 AND
                (I.create_at >= DATE_SUB(?, INTERVAL 2 DAY) AND I.create_at < DATE_ADD(?, INTERVAL 2 DAY));
        `;
        params = [createDate, createDate];
    } else {
        selectRecommendItemQuery = `
            SELECT P.id AS post_id, PI.data AS image, V.name AS vendor, title, title_price, intro, off,
                   I.id AS item_id, I.name AS item_name, II.data AS item_image, price AS item_price, gift_enable
            FROM recommend_items AS RI, items AS I, item_images AS II, posts AS P, post_images AS PI, vendors AS V,
                 categories AS C
            WHERE RI.post_id = P.id AND
                II.item_id = I.id AND
                I.post_id = P.id AND
                I.category_id = C.id AND
                P.image_id = PI.id AND
                P.vendor_id = V.id AND
                C.main_class = ? AND
                (RI.create_at >= ? AND RI.create_at < DATE_ADD(?, INTERVAL 1 DAY));
        `;
        params = [category, createDate, createDate];
    }
    return await connection.query(selectRecommendItemQuery, params);
}

// 상품 상세정보 조회
async function selectItemDescription (connection, postId) {
    const selectItemDescriptionQuery = `
        SELECT items.id AS item_id, items.name AS item_name, data AS item_image, price AS item_price, gift_enable
        FROM items, item_images
        WHERE item_images.item_id = items.id AND
              post_id = ?;
    `;
    return await connection.query(selectItemDescriptionQuery, postId);
}

// 상품 검색
async function selectSearchItem (connection, searchText) {
    const selectSearchItemQuery = `
        SELECT P.id AS post_id, PI.data AS image, V.name AS vendor, title, title_price, intro, off,
               I.id AS item_id, I.name AS item_name, II.data AS item_image, price AS item_price, gift_enable
        FROM  items AS I, item_images AS II, posts AS P, post_images AS PI, vendors AS V
        WHERE II.item_id = I.id AND
            I.post_id = P.id AND
            P.image_id = PI.id AND
            P.vendor_id = V.id AND
            P.title REGEXP ?;
    `;
    return await connection.query(selectSearchItemQuery, searchText);
}

module.exports = {
    selectRandomItem,
    selectDealItem,
    selectRecommendItem,
    selectRecommendItemByCategory,
    selectItemDescription,
    selectSearchItem
};