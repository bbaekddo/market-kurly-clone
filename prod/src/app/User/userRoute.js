module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 사용자 생성
    app.post('/users', user.postUsers);
    
    // 2. 사용자 로그인
    app.post('/users/login', user.login);
    
    // 3. 사용자 조회
    app.get('/users/:userIdx', jwtMiddleware, user.getUsers);

    // 4. 사용자 수정
    app.patch('/users/:userIdx', jwtMiddleware, user.patchUsers);

    // 5. 사용자 삭제
    app.put('/users/:userIdx', jwtMiddleware, user.deleteUsers);
};