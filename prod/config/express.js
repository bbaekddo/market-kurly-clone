const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());
    // app.use(express.static(process.cwd() + '/public'));

    require('../src/app/User/userRoute')(app);
    require('../src/app/Item/itemRoute')(app);
    require('../src/app/Review/reviewRoute')(app);
    require('../src/app/Watchlist/watchlistRoute')(app);
    require('../src/app/Basket/basketRoute')(app);
    require('../src/app/Order-List/orderListRoute')(app);
    require('../src/app/Category/categoryRoute')(app);

    return app;
};