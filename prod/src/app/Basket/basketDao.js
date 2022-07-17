// 장바구니 조회
async function selectBasket (connection, userIdx) {
    const selectBasketQuery = `
        SELECT B.id AS basket_id, data AS image, V.name AS vendor, title,
               off, I.id AS item_id, I.name AS item_name, price AS item_price, quantity
        FROM baskets AS B, items AS I, posts AS P, post_images AS PI, vendors AS V
        WHERE B.item_id = I.id AND
              I.post_id = P.id AND
              P.image_id = PI.id AND
              P.vendor_id = V.id AND
              B.status = ? AND
              B.user_index = ?
        ORDER BY B.create_at DESC;
    `;
    const params = ['RUN', userIdx];
    return await connection.query(selectBasketQuery, params);
}

// 장바구니 특정 조회
async function selectBasketCheck (connection, userIdx, itemId) {
    const selectBasketCheckQuery = `
        SELECT id
        FROM baskets
        WHERE user_index = ? AND
              item_id = ? AND
              baskets.status = ?;
    `;
    const params = [userIdx, itemId, 'RUN'];
    return await connection.query(selectBasketCheckQuery, params);
}

// 장바구니 상품 추가
async function insertBasket (connection, userIdx, itemId, quantity) {
    const insertBasketQuery = `
        INSERT INTO baskets
        SET user_index = ?, item_id = ?, quantity = ?;
    `;
    const params = [userIdx, itemId, quantity];
    return await connection.query(insertBasketQuery, params);
}

// 장바구니 상품 수정
async function updateBasket (connection, userIdx, itemId, quantity) {
    const updateBasketQuery = `
        UPDATE baskets
        SET quantity = ?
        WHERE user_index = ? AND item_id = ?;
    `;
    const params = [quantity, userIdx, itemId];
    await connection.query(updateBasketQuery, params);
}

// 장바구니 상품 삭제
async function deleteBasket (connection, userIdx, itemId) {
    const deleteBasketQuery = `
        DELETE FROM baskets
        WHERE user_index = ? AND
              item_id = ? AND
              baskets.status = ?;
    `;
    const params = [userIdx, itemId, 'RUN'];
    await connection.query(deleteBasketQuery, params);
}

module.exports = {
    selectBasket,
    selectBasketCheck,
    insertBasket,
    updateBasket,
    deleteBasket
}