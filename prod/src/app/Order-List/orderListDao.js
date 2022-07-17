// 주문 목록 조회
async function selectOrderList (connection, userIdx) {
    const selectOrderListQuery = `
        SELECT V.name AS vendor, PI.data AS image, I.name AS item_name, title,
               price AS item_price, quantity, O.group AS 'group', pay,
               DATE_FORMAT(O.create_at, '%Y-%m-%d') AS order_date, address,
               O.status
        FROM vendors AS V, items AS I, posts AS P, post_images AS PI,
             baskets AS B, order_lists AS O, users AS U
        WHERE O.user_index = U.id AND
              O.basket_id = B.id AND
              B.item_id = I.id AND
              I.post_id = P.id AND
              P.image_id = PI.id AND
              P.vendor_id = V.id AND
              O.user_index = ?
        ORDER BY O.group DESC;
    `;
    return await connection.query(selectOrderListQuery, userIdx);
}

// 주문 목록 그룹 조회
async function selectOrderListGroup (connection, userIdx) {
    const selectOrderListGroup = `
        SELECT order_lists.group AS 'group'
        FROM order_lists
        WHERE user_index = ?
        ORDER BY order_lists.group DESC
        LIMIT 1;
    `;
    return await connection.query(selectOrderListGroup, userIdx);
}

// 사용자 Index와 그룹 번호로 주문 목록 조회
async function selectOrderListCheck (connection, userIdx, group) {
    const selectOrderListCheckQuery = `
        SELECT id
        FROM order_lists
        WHERE user_index = ? AND
              order_lists.group = ?;
    `;
    const params = [userIdx, group];
    return await connection.query(selectOrderListCheckQuery, params);
}

// 장바구니 조회
async function selectBasket (connection, basketId) {
    const selectBasketQuery = `
        SELECT user_index, item_id, quantity
        FROM baskets
        WHERE id = ?;
    `;
    return await connection.query(selectBasketQuery, basketId);
}

// 장바구니 상태 조회
async function selectBasketStatus (connection, basketId) {
    const selectBasketStatusQuery = `
        SELECT item_id, status
        FROM baskets
        WHERE id = ?;
    `;
    return await connection.query(selectBasketStatusQuery, basketId);
}

// 주문 목록 추가
async function insertOrderList (connection ,userIdx, basketId, group, pay) {
    const insertOrderListQuery = `
        INSERT INTO order_lists SET
        user_index =?, basket_id = ?, order_lists.group = ?, pay = ?;
    `;
    const params = [userIdx, basketId, group, pay];
    await connection.query(insertOrderListQuery, params);
}

// 장바구나 ID status 변경
async function updateBasketStatus (connection, basketId) {
    const updateBasketStatusQuery = `
        UPDATE baskets SET
        status = ?
        WHERE id = ?;
    `;
    const params = ['DELETED', basketId];
    await connection.query(updateBasketStatusQuery, params);
}

// 주문 목록 수정
async function updateOrderList (connection, userIdx, group, status) {
    const updateOrderListQuery = `
        UPDATE order_lists SET
        status = ?
        WHERE user_index = ? AND
              order_lists.group = ?;
    `;
    const params = [status, userIdx, group];
    await connection.query(updateOrderListQuery, params);
}

module.exports = {
    selectOrderList,
    selectOrderListGroup,
    selectOrderListCheck,
    selectBasket,
    selectBasketStatus,
    insertOrderList,
    updateBasketStatus,
    updateOrderList
}