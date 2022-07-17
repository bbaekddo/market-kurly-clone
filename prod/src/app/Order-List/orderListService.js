const {logger} = require('../../../config/winston');
const {pool} = require('../../../config/database');
const orderListProvider = require('./orderListProvider');
const orderListDao = require('./orderListDao');
const baseResponse = require('../../../config/baseResponseStatus');
const {response, errResponse} = require('../../../config/response');

// 주문 목록 추가
exports.createOrderList = async function (userIdx, orderList, pay) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        // basket ID status 체크
        // 요청 객체를 배열로 변경 (2022-04-01)
        let basketStatus;
        for (let i=0; i<orderList.length; i++) {
            basketStatus = await orderListProvider.getBasketStatus(orderList[i]);
    
            if (basketStatus[0].status === 'STOP') {
                return errResponse(baseResponse.ORDERLIST_BASKET_ID_STOP);
            } else if (basketStatus[0].status === 'DELETED') {
                return errResponse(baseResponse.ORDERLIST_BASKET_ID_WITHDRAWAL);
            }
        }
        
        /*for (let id in orderList) {
            basketStatus = await orderListProvider.getBasketStatus(orderList[id]);
            
            if (basketStatus[0].status === 'STOP') {
                return errResponse(baseResponse.ORDERLIST_BASKET_ID_STOP);
            } else if (basketStatus[0].status === 'DELETED') {
                return errResponse(baseResponse.ORDERLIST_BASKET_ID_WITHDRAWAL);
            }
        }*/
    
        // 주문 그룹 확인 및 설정
        let orderGroup;
        const orderListGroupRows = await orderListProvider.getOrderListGroup(userIdx);
    
        if (orderListGroupRows.length < 1) {
            orderGroup = 1;
        } else {
            orderGroup = orderListGroupRows[0].group + 1;
        }
        
        // 트랜잭션 시작
        let orderListResult = {};
        try {
            await connection.beginTransaction();
            
            // 1) 장바구니 ID 조회
            // 2) 장바구니 ID의 구매자와 현재 사용자 일치 여부 확인
            // 3) 장바구니 상품 수량 확인
            // 요청 객체를 배열로 변경 (2022-04-01)
            for (let j=0; j<orderList.length; j++) {
                const basketRows = await orderListProvider.getBasket(orderList[j]);
    
                if (basketRows.length < 1) {
                    return errResponse(baseResponse.ORDERLIST_BASKET_ID_NOT_MATCH);
                } else if (basketRows[0].user_index !== userIdx) {
                    return errResponse(baseResponse.ORDERLIST_BASKET_ID_WRONG);
                } else if (basketRows[0].quantity === 0) {
                    return errResponse(baseResponse.ORDERLIST_BASKET_ITEM_QUANTITY_ZERO);
                }
            }
            
            /*for (let id in orderList) {
                const basketRows = await orderListProvider.getBasket(orderList[id]);
        
                if (basketRows.length < 1) {
                    return errResponse(baseResponse.ORDERLIST_BASKET_ID_NOT_MATCH);
                } else if (basketRows[0].user_index !== userIdx) {
                    return errResponse(baseResponse.ORDERLIST_BASKET_ID_WRONG);
                } else if (basketRows[0].quantity === 0) {
                    return errResponse(baseResponse.ORDERLIST_BASKET_ITEM_QUANTITY_ZERO);
                }
            }*/
    
            // 해당 상품 주문 목록에 추가
            // 요청 객체를 배열로 변경 (2022-04-01)
            let i = 1;
            for (let k=0; k<orderList.length; k++) {
                await orderListDao.insertOrderList(connection, userIdx, orderList[k], orderGroup, pay);
                orderListResult['basekt_id' + i] = orderList[k];
                i++;
    
                // 장바구니 ID status 변경
                await orderListDao.updateBasketStatus(connection, orderList[k]);
            }
            
            /*for (let id in orderList) {
                await orderListDao.insertOrderList(connection, userIdx, orderList[id], orderGroup, pay);
                orderListResult['basekt_id' + i] = orderList[id];
                i++;
        
                // 장바구니 ID status 변경
                await orderListDao.updateBasketStatus(connection, orderList[id]);
            }*/
    
            // 모든 작업 성공 시 커밋
            await connection.commit();
        } catch (err) {
            // 작업 중간에 실패 시 롤백
            await connection.rollback();
            
            return errResponse(err);
        }
        
        // 주문 목록 반환
        orderListResult['pay'] = pay;
        
        return response(baseResponse.SUCCESS, orderListResult);
    } catch (err) {
        logger.error(`App - createOrderList Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};

// 주문 목록 수정
exports.patchOrderList = async function (userIdx, group, status) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        const orderListRows = await orderListProvider.getOrderListCheck(userIdx, group);
        if (orderListRows.length < 1) {
            return errResponse(baseResponse.PATCH_ORDERLIST_NOTHING);
        }
        
        await orderListDao.updateOrderList(connection, userIdx, group, status);
        
        return response(baseResponse.SUCCESS, {'group': Number(group), 'status': status});
    } catch (err) {
        logger.error(`App - patchOrderLIst Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
};