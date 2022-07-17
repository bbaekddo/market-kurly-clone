// 카테고리 목록 조회
async function selectCategory (connection) {
    const selectCategoryQuery = `
        SELECT main_class, sub_class
        FROM categories;
    `;
    return await connection.query(selectCategoryQuery);
}

// 카테고리별 상품 조회
async function selectCategoryItem (connection, mainClass, subClass) {
    if (subClass === null) {
        const selectCateogoryMainItemQuery = `
            SELECT P.id AS post_id, PI.data AS image, V.name AS vendor, title, title_price, intro, off,
                   I.id AS item_id, I.name AS item_name, II.data AS item_image, price AS item_price, gift_enable
            FROM categories AS C, items AS I, item_images AS II, posts AS P, post_images AS PI,
                 vendors AS V
            WHERE II.item_id = I.id AND
                I.post_id = P.id AND
                P.image_id = PI.id AND
                P.vendor_id = V.id AND
                I.category_id = C.id AND
                C.main_class = ?
            ORDER BY P.create_at DESC;
        `;
        return await connection.query(selectCateogoryMainItemQuery, mainClass);
    } else {
        const selectCategorySubItemQuery = `
            SELECT P.id AS post_id, PI.data AS image, V.name AS vendor, title, title_price, intro, off,
                   I.id AS item_id, I.name AS item_name, II.data AS item_image, price AS item_price, gift_enable
            FROM categories AS C, items AS I, item_images AS II, posts AS P, post_images AS PI,
                 vendors AS V
            WHERE II.item_id = I.id AND
                  I.post_id = P.id AND
                P.image_id = PI.id AND
                P.vendor_id = V.id AND
                I.category_id = C.id AND
                C.main_class = ? AND
                C.sub_class = ?
            ORDER BY P.create_at DESC;
        `;
        const params = [mainClass, subClass];
        return await connection.query(selectCategorySubItemQuery, params);
    }
}

module.exports = {
    selectCategory,
    selectCategoryItem
}