const express = require('express');
const router = express.Router();

const { sequelize, Item, Order_item } = require('../models');

// 발주 생성
router.post('/order_item/:item_id', async (req, res) => {
    const { item_id } = req.params;
    const { state, amount } = req.body;
    try {
        const orderItem = await Order_item.create({ item_id, state, amount });
        return res.status(200).json({ msg: '성공적으로 상품이 발주되었습니다.', orderItem });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: '상품 발주에 실패하였습니다.' });
    }
});

// 발주 수정
router.put('/order_item/:item_id/:order_item_id', async (req, res) => {
    const { item_id, order_item_id } = req.params;
    const orderItem = await Order_item.findOne({ where: { order_item_id } });
    const itemState = orderItem.state;
    const item = await Item.findOne({ where: item_id });

    const transaction = await sequelize.transaction();

    try {
        if (itemState === 'ORDERED') {
            await Order_item.update({ state: 'PENDING' }, { where: { order_item_id } });
        } else if (itemState === 'PENDING') {
            item.amount += orderItem.amount;
            item.save({ transaction });
            orderItem.update({ state: 'COMPLETED' }, { where: { order_item_id } }, { transaction });
        }
        await transaction.commit();
        return res.status(200).json({ message: '발주를 성공적으로 수정하였습니다.' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: '상품 발주 수정에 실패하였습니다.' });
    }
});

module.exports = router;
