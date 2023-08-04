const express = require('express');
const router = express.Router();

const { Order_item } = require('../models');

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
router.put('/order_item/:order_item_id', async (req, res) => {
    const { item_id } = req.params;
    const { state, amount } = req.body;
});

module.exports = router;
