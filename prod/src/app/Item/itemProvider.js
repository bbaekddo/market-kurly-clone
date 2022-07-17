const {pool} = require('../../../config/database');
const itemDao = require('./itemDao');
const responseJSON = require('../../../config/postResponseJSON');

exports.getRandomItem = async function (createDate) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const randomItemResult = await itemDao.selectRandomItem(connection, createDate);
    connection.release();

    return responseJSON(randomItemResult);
};

exports.getDealItem = async function (createDate) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const dealItemResult = await itemDao.selectDealItem(connection, createDate);
    connection.release();
   
    return responseJSON(dealItemResult);
};

exports.getRecommendItem = async function (createDate) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const recommendItemResult = await itemDao.selectRecommendItem(connection, createDate);
    connection.release();

    return responseJSON(recommendItemResult);
};

exports.getRecommendItemByCategory = async function (category, createDate) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const recommendItemResult = await itemDao.selectRecommendItemByCategory(connection, category, createDate);
    connection.release();
    
    return responseJSON(recommendItemResult);
};

exports.getItemDescription = async function (postId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const itemDescriptionResult = await itemDao.selectItemDescription(connection, postId);
    connection.release();
    
    return itemDescriptionResult[0];
};

exports.getSearch = async function (searchText) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const searchResult = await itemDao.selectSearchItem(connection, searchText);
    connection.release();
    
    return responseJSON(searchResult);
};