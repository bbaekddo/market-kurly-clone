// 찜한 상품 조회
async function selectWatchlist(connection, userIdx) {
    const selectWatchlistQuery = `
        SELECT P.id AS post_id, PI.data AS post_image, V.name AS vendor, title, title_price, off
        FROM watchlists AS W, posts AS P, post_images AS PI, vendors AS V
        WHERE W.post_id = P.id AND
              P.image_id = PI.id AND
              P.vendor_id = V.id AND
              W.user_index = ?
        ORDER BY W.create_at DESC
        LIMIT 5;
    `;
    return await connection.query(selectWatchlistQuery, userIdx);
}

// 찜한 상품 특정 조회
async function selectWatchlistCheck(connection, userIdx, postId) {
    const selectWatchlistCheckQuery = `
        SELECT P.id AS post_id, PI.data AS post_image, V.name AS vendor, title, title_price, off
        FROM watchlists AS W, posts AS P, post_images AS PI, vendors AS V
        WHERE W.post_id = P.id AND
            P.image_id = PI.id AND
            P.vendor_id = V.id AND
            W.user_index = ? AND
            W.post_id = ?;
    `;
    const params = [userIdx, postId];
    return await connection.query(selectWatchlistCheckQuery, params);
}

// 찜한 상품 추가
async function insertWatchlist(connection, userIdx, postId) {
    const insertWatchlistQuery = `
        INSERT INTO watchlists SET
        user_index = ?, post_id = ?;
    `;
    const params = [userIdx, postId];
    return await connection.query(insertWatchlistQuery, params);
}

// 찜한 상품 삭제
async function deleteWatchlist(connection, userIdx, postId) {
    const deleteWatchlistQuery = `
        DELETE FROM watchlists
        WHERE user_index = ? AND
              post_id = ?;
    `;
    const params = [userIdx, postId];
    return await connection.query(deleteWatchlistQuery, params);
}

module.exports = {
    selectWatchlist,
    selectWatchlistCheck,
    insertWatchlist,
    deleteWatchlist
}