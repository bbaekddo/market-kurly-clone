// 사용자 후기 조회
async function selectReview(connection, reviewId) {
    const selectReviewQuery = `
        SELECT user_index, title, content
        FROM reviews
        WHERE id = ?;
    `;
    return await connection.query(selectReviewQuery, reviewId);
}

// 게시글 ID로 사용자 후기 조회
async function selectReviewByPostId(connection, postId) {
    const selectReviewByPostIdQuery = `
        SELECT R.id AS review_id, R.title AS title, U.name AS name, R.content AS content,
               DATE_FORMAT(R.create_at, '%Y-%m-%d') AS createDate
        FROM reviews AS R, users AS U, items AS I
        WHERE R.user_index = U.id AND
            R.item_id = I.id AND
            I.post_id = ?
        ORDER BY R.create_at DESC
        LIMIT 4;
    `;
    return await connection.query(selectReviewByPostIdQuery, postId);
}

// 사용자 후기 작성
async function insertReview(connection, userIdx, item_id, title, content) {
    const insertReviewQuery = `
        INSERT INTO reviews
        SET user_index = ?, item_id = ?, title = ?, content = ?
    `;
    const params = [userIdx, item_id, title, content];
    return await connection.query(insertReviewQuery, params);
}

// 사용자 후기 수정
async function updateReview(connection, reviewId, oldInfoRows, newInfoRows) {
    let title, content;
    
    // title 확인
    if (newInfoRows[0] === null) {
        title = oldInfoRows[0];
    } else {
        title = newInfoRows[0];
    }
    
    // content 확인
    if (newInfoRows[1] === null) {
        content = oldInfoRows[1];
    } else {
        content = newInfoRows[1];
    }
    
    const updateReviewQuery = `
        UPDATE reviews
        SET title = ?, content = ?
        WHERE id = ?;
    `;
    const params = [title, content, reviewId];
    return await connection.query(updateReviewQuery, params);
}

// 사용자 후기 삭제
async function deleteReview(connection, reviewId) {
    const deleteReviewQuery = `
        DELETE FROM reviews
        WHERE id = ?;
    `;
    return await connection.query(deleteReviewQuery, reviewId);
}

module.exports = {
    selectReview,
    selectReviewByPostId,
    insertReview,
    updateReview,
    deleteReview
}