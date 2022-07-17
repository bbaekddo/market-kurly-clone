// Index로 사용자 조회
async function selectUserByIdx(connection, userIdx) {
    const selectUserByIdxQuery = `
        SELECT user_id, name, email, phone, address, birthday, gender, mileage, status
        FROM users
        WHERE id = ?;
    `;
    return await connection.query(selectUserByIdxQuery, userIdx);
}

// ID로 사용자 조회
async function selectUserById(connection, id) {
    const selectUserByIdQuery = `
        SELECT id, name, email, phone, address, birthday, gender, mileage, status
        FROM users
        WHERE user_id = ?;
    `;
    return await connection.query(selectUserByIdQuery, id);
}

// 사용자 비밀번호 조회
async function selectUserPassword(connection, id) {
    const selectUserPasswordQuery = `
        SELECT id, password
        FROM users
        WHERE user_id = ?;
    `;
    return await connection.query(selectUserPasswordQuery, id);
}

// 사용자 계정 상태 조회
async function selectUserStatus(connection, id) {
    const selectUserStatusQuery = `
        SELECT id, status
        FROM users
        WHERE user_id = ?;
    `;
    return await connection.query(selectUserStatusQuery, id);
}

// Index로 사용자 계정 상태 조회
async function selectUserStatusByIdx(connection, idx) {
    const selectUserStatusQuery = `
        SELECT user_id, status
        FROM users
        WHERE id = ?;
    `;
    return await connection.query(selectUserStatusQuery, idx);
}

// 사용자 현재 데이터 조회
async function selectUserInfos(connection, userIdx) {
    const selectUserInfosQuery = `
        SELECT email, phone, address, birthday, gender
        FROM users
        WHERE id = ?;
    `;
    return await connection.query(selectUserInfosQuery, userIdx);
}

// 사용자 생성
async function insertUser(connection, insertUserParams) {
    const insertUserQuery = `
        INSERT INTO users SET
        user_id = ?, password = ?, name = ?, email = ?, phone = ?,
        address = ?, birthday = ?, gender = ?, mileage = ?;
    `;
    return await connection.query(insertUserQuery, insertUserParams);
}

// 사용자 수정
async function updateUser(connection, password, oldInfoParams, newInfoParams, userIdx) {
    let email, phone, address, birthday, gender;
    // email 확인
    if (newInfoParams[0] === null) {
        email = oldInfoParams[0];
    } else {
        email = newInfoParams[0];
    }
    
    // phone 확인
    if (newInfoParams[1] === null) {
        phone = oldInfoParams[1];
    } else {
        phone = newInfoParams[1];
    }
    
    // address 확인
    if (newInfoParams[2] === null) {
        address = oldInfoParams[2];
    }else {
        address = newInfoParams[2];
    }
    
    // birthday 확인
    if (newInfoParams[3] === null) {
        birthday = oldInfoParams[3];
    }else {
        birthday = newInfoParams[3];
    }
    
    // gender 확인
    if (newInfoParams[4] === null) {
        gender = oldInfoParams[4];
    }else {
        gender = newInfoParams[4];
    }
    
    // 비밀번호 확인
    if (password === null) {
        const params = [email, phone, address, birthday, gender, userIdx];
        const updateUserQuery = `
            UPDATE users SET
            email = ?, phone = ?, address = ?, birthday = ?, gender = ?
            WHERE id = ?;
        `;
        await connection.query(updateUserQuery, params);
    } else {
        const params = [password, email, phone, address, birthday, gender, userIdx];
        const updateUserQuery = `
            UPDATE users SET
            password = ?, email = ?, phone = ?, address = ?, birthday = ?, gender = ?
            WHERE id = ?;
        `;
        await connection.query(updateUserQuery, params);
    }
}

// 사용자 삭제
async function deleteUser(connection, userIdx) {
    const deleteUserQuery = `
        UPDATE users SET
        status = ?
        WHERE id = ?;
    `;
    const params = ['DELETED', userIdx];
    await connection.query(deleteUserQuery, params);
}


module.exports = {
    selectUserByIdx,
    selectUserById,
    selectUserPassword,
    selectUserStatus,
    selectUserStatusByIdx,
    selectUserInfos,
    insertUser,
    updateUser,
    deleteUser
};
