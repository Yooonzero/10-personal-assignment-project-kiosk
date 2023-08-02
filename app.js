const express = require('express');
const app = express();

const itemRouter = require('./routes/item.router');

const HOST = '127.0.0.1';
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', itemRouter);

app.listen(PORT, HOST, () => {
    console.log('Server is listening...', PORT);
});
