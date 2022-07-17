const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const regexEmail = require("regex-email");

// 1. 사용자 생성
exports.postUsers = async function (req, res) {
    const {id, password, name, email, phone} = req.body;
    let {address, birthday, gender} = req.body;

    // 빈 값 체크
    if (!id) {
        return res.send(errResponse(baseResponse.SIGNUP_ID_EMPTY));
    }
    
    if (!password) {
        return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_EMPTY));
    }
    
    if (!name) {
        return res.send(errResponse(baseResponse.SIGNUP_NAME_EMPTY));
    }
    
    if (!email) {
        return res.send(errResponse(baseResponse.SIGNUP_EMAIL_EMPTY));
    }
    
    if (!phone) {
        return res.send(errResponse(baseResponse.SIGNUP_PHONE_EMPTY));
    }

    // 길이 체크
    if (id.length > 20) {
        return res.send(errResponse(baseResponse.SIGNUP_ID_LENGTH));
    }
    
    if (password.length < 5 || password.length >= 20) {
        return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_LENGTH));
    }
    
    if (name.length > 10) {
        return res.send(errResponse(baseResponse.SIGNUP_NAME_LENGTH));
    }

    // 형식 체크
    const specialCharacter = /[~!@#$%^&*()_+|<>?:{}]/;
    
    if (specialCharacter.test(id)) {
        return res.send(errResponse(baseResponse.SIGNUP_ID_ERROR_TYPE));
    }
    
    if (specialCharacter.test(name)) {
        return res.send(errResponse(baseResponse.SIGNUP_NAME_ERROR_TYPE));
    }
    
    if (!regexEmail.test(email)) {
        return res.send(errResponse(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    }
    
    // null 초기화
    if (!address) {
        address = null;
    }
    
    if (!birthday) {
        birthday = null;
    }
    
    if (!gender) {
        gender = null;
    }
    
    const signUpResponse = await userService.createUser(
        id,
        password,
        name,
        email,
        phone,
        address,
        birthday,
        gender
    );

    return res.send(signUpResponse);
};

// 2. 사용자 로그인
exports.login = async function (req, res) {
    const {id, password} = req.body;
    
    // 빈 값 체크
    if (!id) {
        return res.send(errResponse(baseResponse.SIGNIN_ID_EMPTY));
    }
    
    if (!password) {
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));
    }
    
    // 길이 체크
    if (id.length > 20) {
        return res.send(errResponse(baseResponse.SIGNIN_ID_LENGTH));
    }
    
    if (password.length < 5 || password.length >= 20) {
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_LENGTH));
    }
    
    // 형식 체크
    const specialCharacter = /[~!@#$%^&*()_+|<>?:{}]/;
    
    if (specialCharacter.test(id)) {
        return res.send(errResponse(baseResponse.SIGNIN_ID_ERROR_TYPE));
    }
    
    const signInResponse = await userService.postSignIn(id, password);
    
    return res.send(signInResponse);
};

// 3. 사용자 조회
exports.getUsers = async function (req, res) {
    const userIdxFromJWT = req.verifiedToken.userIdx;
    const userIdx = req.params.userIdx;
    
    if (userIdxFromJWT !== Number(userIdx)) {
        res.send(errResponse(baseResponse.GET_INDEX_NOT_MATCH));
    } else {
        const userResponse = await userProvider.getUserByIdx(userIdxFromJWT);
    
        return res.send(response(baseResponse.SUCCESS, userResponse));
    }
};

// 4. 사용자 수정
exports.patchUsers = async function (req, res) {
    const userIdxFromJWT = req.verifiedToken.userIdx;
    const userIdx = req.params.userIdx;

    let {password, email, phone, address, birthday, gender} = req.body;

    if (userIdxFromJWT !== Number(userIdx)) {
        res.send(errResponse(baseResponse.PATCH_INDEX_NOT_MATCH));
    } else {
        // 빈 값이면 null로 설정
        if (!password) {
            password = null;
        } else {
            // 길이 체크
            if (password.length < 5 || password.length >= 20) {
                return res.send(errResponse(baseResponse.PATCH_PASSWORD_LENGTH));
            }
        }
        
        if (!email) {
            email = null;
        } else {
            // 형식 체크
            if (!regexEmail.test(email)) {
                return res.send(errResponse(baseResponse.PATCH_EMAIL_ERROR_TYPE));
            }
        }
        
        if (!phone) {
            phone = null;
        }
    
        if (!address) {
            address = null;
        }
    
        if (!birthday) {
            birthday = null;
        }
    
        if (!gender) {
            gender = null;
        }
        
        if (password === null && email === null && phone === null
            && address === null && birthday === null && gender === null) {
            return res.send(errResponse(baseResponse.PATCH_ALL_PARAMETER_EMPTY));
        }

        const editUserResponse = await userService.editUser(
            userIdx,
            password,
            email,
            phone,
            address,
            birthday,
            gender
        );
        
        return res.send(editUserResponse);
    }
};

// 5. 사용자 삭제
exports.deleteUsers = async function (req, res) {
    const userIdxFromJWT = req.verifiedToken.userIdx;
    const userIdx = req.params.userIdx;
    
    if (userIdxFromJWT !== Number(userIdx)) {
        res.send(errResponse(baseResponse.DELETE_INDEX_NOT_MATCH));
    } else {
        const deleteUserResponse = await userService.deleteUser(userIdx);
        
        return res.send(deleteUserResponse);
    }
};

/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
/*exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};*/