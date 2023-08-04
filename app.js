const express = require('express');
const app = express();

const itemRouter = require('./routes/item.router');
const order_itemRouter = require('./routes/order_item.router');
const order_customerRouter = require('./routes/item_order_customer.router');
const option_Router = require('./routes/option.router');

const HOST = '127.0.0.1';
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', [itemRouter, order_itemRouter, order_customerRouter, option_Router]);

app.listen(PORT, HOST, () => {
    console.log('Server is listening...', PORT);
});
