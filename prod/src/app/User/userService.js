const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const welcomeMail = require('../../../config/mailer');

exports.createUser = async function (id, password, name, email, phone, address, birthday, gender) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        // ID 중복 확인
        const idRows = await userProvider.getUserById(id);
        if (idRows.length > 0) {
            return errResponse(baseResponse.SIGNUP_REDUNDANT_ID);
        }
       
        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        // 사용자 생성 정보 파라미터
        // 마일리지 필드 추가 (2022-03-27)
        const mileage = 0.5;
        const insertUserParams = [id, hashedPassword, name, email, phone, address, birthday, gender, mileage];
        const userResult = await userDao.insertUser(connection, insertUserParams);
    
        // 가입축하 메일 보내기
        const params = {
            name: name,
            email: email
        }
        await welcomeMail(params);
        
        return response(baseResponse.SUCCESS, {'userIdx': userResult[0].insertId});
    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};

exports.postSignIn = async function (id, password) {
    try {
        // ID 확인
        const idRows = await userProvider.getUserById(id);
        if (idRows.length < 1) {
            return errResponse(baseResponse.SIGNIN_ID_WRONG);
        }

        // 비밀번호 확인
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");
        const passwordRows = await userProvider.passwordCheck(id);
        if (passwordRows[0].password !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 계정 상태 확인
        const statusRows = await userProvider.statusCheck(id);
        if (statusRows[0].status === "STOP") {
            return errResponse(baseResponse.SIGNIN_STOP_ACCOUNT);
        } else if (statusRows[0].status === "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        //토큰 생성 Service
        const userRows = await userProvider.getUserById(id);
        let token = await jwt.sign(
            {
                userIdx: userRows[0].id,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS, {'userIdx': userRows[0].id, 'mileage': userRows[0].mileage,
                        'status': userRows[0].status, 'jwt': token});
    } catch (err) {
        logger.error(`App - signIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.editUser = async function (userIdx, password, email, phone, address, birthday, gender) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        // 계정 상태 확인
        const statusRows = await userProvider.statusCheckByIdx(userIdx);
        if (statusRows[0].status === "STOP") {
            return errResponse(baseResponse.PATCH_STOP_ACCOUNT);
        } else if (statusRows[0].status === "DELETED") {
            return errResponse(baseResponse.PATCH_WITHDRAWAL_ACCOUNT);
        }
        
        // 변경 데이터 배열 생성
        const oldInfoRows = await userProvider.getOldInfos(userIdx);
        
        const oldInfoParams = Object.values(oldInfoRows[0]);
        const newInfoParams = [email, phone, address, birthday, gender];
    
        // 비밀번호 변환
        let hashedPassword;
        if (password === null) {
            hashedPassword = password;
        } else {
            hashedPassword = await crypto
                .createHash("sha512")
                .update(password)
                .digest("hex");
        }
        
        await userDao.updateUser(connection, hashedPassword, oldInfoParams, newInfoParams, userIdx);

        return response(baseResponse.SUCCESS, {'userIdx': Number(userIdx)});
    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
}

exports.deleteUser = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        // 계정 상태 확인
        const statusRows = await userProvider.statusCheckByIdx(userIdx);
        if (statusRows[0].status === "STOP") {
            return errResponse(baseResponse.DELETE_STOP_ACCOUNT);
        } else if (statusRows[0].status === "DELETED") {
            return errResponse(baseResponse.DELETE_WITHDRAWAL_ACCOUNT);
        }
        
        await userDao.deleteUser(connection, userIdx);
        const userRows = await userProvider.getUserByIdx(userIdx);
        
        return response(baseResponse.SUCCESS, {'userIdx': Number(userIdx), 'status': userRows[0].status});
    } catch (err) {
        logger.error(`App - deleteUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
}