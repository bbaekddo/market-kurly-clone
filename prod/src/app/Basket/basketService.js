const {logger} = require('../../../config/winston');
const {pool} = require('../../../config/database');
const basketProvider = require('./basketProvider');
const basketDao = require('./basketDao');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require('../../../config/response');

// 장바구니 상품 추가
exports.createBasket = async function (userIdx, item_list) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        for (const [index, value] of item_list.entries()) {
            // 기존에 등록한 장바구니가 있는지 확인
            const basketRows = await basketProvider.getBasketCheck(userIdx, item_list[index].id);
            
            if (basketRows.length > 0) {
                return errResponse(baseResponse.BASKET_REDUNDANT_ITEM);
            }
        }
        
        // 트랜잭션 시작
        try {
            await connection.beginTransaction();
    
            // 장바구니에 상품 추가
            let basketResult = [];
            for (const [index, value] of item_list.entries()) {
                const createResult = await basketDao.insertBasket(connection, userIdx, item_list[index].id, item_list[index].quantity);
        
                basketResult.push(createResult[0].insertId);
            }
            
            await connection.commit();
    
            return response(baseResponse.SUCCESS, {'basket_id': basketResult});
        } catch (err) {
            await connection.rollback();
            
            return errResponse(baseResponse.BASKET_TRANSACTION_ERROR);
        }
    } catch (err) {
        logger.error(`App - createBasket Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};

// 장바구니 상품 수정
exports.patchBasket = async function (userIdx, itemId, quantity) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        
        const basketRows = await basketProvider.getBasketCheck(userIdx, itemId);
        if (basketRows.length < 1) {
            return errResponse(baseResponse.PATCH_BASKET_NOTHING);
        }
        
        await basketDao.updateBasket(connection, userIdx, itemId, quantity);
        const patchBasketResult = await basketProvider.getBasketCheck(userIdx, itemId);
        
        return response(baseResponse.SUCCESS, {'basket_id': patchBasketResult[0].id, 'item_id': Number(itemId)});
    } catch (err) {
        logger.error(`App - patchBasket Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};

// 장바구니 상품 삭제
exports.deleteBasket = async function (userIdx, itemId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        
        const basketRows = await basketProvider.getBasketCheck(userIdx, itemId);
        if (basketRows.length < 1) {
            return errResponse(baseResponse.DELETE_BASKET_NOTHING);
        }
        
        await basketDao.deleteBasket(connection, userIdx, itemId);
        
        return response(baseResponse.SUCCESS, {'item_id': Number(itemId)});
    } catch (err) {
        logger.error(`App - deleteBasket Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};