const express = require('express');
const router = express.Router();
const { Item, Item_order_customer, Order_customer, sequelize } = require('../models');

// 주문 생성
router.post('/order_customers', async (req, res) => {
    const { item_id, amount } = req.body;
    let price = 0;
    const item = await Item.findOne({ where: { item_id } });
    price = amount * item.price;

    try {
        const orderCustomer = await Order_customer.create({});
        await Item_order_customer.create({
            item_id,
            order_customer_id: orderCustomer.order_customer_id,
            amount,
            option: 1,
            price,
        });
        return res.status(200).json({ message: '상품을 주문하였습니다.', 주문번호: orderCustomer.order_customer_id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: '주문 생성에 실패하였습니다.' });
    }
});

// 주문 조회
router.get('/order_customers/:order_customer_id', async (req, res) => {
    const { order_customer_id } = req.params;
    try {
        const order = await Order_customer.findOne({
            where: { order_customer_id },
            include: [
                {
                    model: Item_order_customer,
                    attributes: ['item_id', 'amount', 'option', 'price'],
                },
            ],
        });
        return res.status(200).json({ msg: '주문을 조회했습니다.', order });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: '주문 조회에 실패하였습니다.' });
    }
});

// 주문 상태 수정
router.put('/order_customers/:order_customer_id', async (req, res) => {
    const { order_customer_id } = req.params;
    const order = await Order_customer.findOne({ where: { order_customer_id } });
    const customer = await Item_order_customer.findOne({ where: { order_customer_id } });
    const item = await Item.findOne({ where: { item_id: customer.item_id } });

    const state = order.state;
    const transaction = await sequelize.transaction();
    try {
        if (state === true) {
            return res.status(409).json({ message: '이미 처리된 주문입니다.' });
        } else if (item.amount < customer.amount) {
            return res.status(409).json({ message: '재고 수량이 부족합니다.' });
        } else {
            item.amount -= customer.amount;
            item.save({ transaction });

            order.update({ state: true }, { where: { order_customer_id } }, { transaction });
        }
        await transaction.commit();
        return res.status(200).json({ message: '주문이 완료되었습니다.' });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ message: '주문 수정에 실패하였습니다.' });
    }
});

// 주문 삭제
router.delete('/order_customers/:order_customer_id', async (req, res) => {
    const { order_customer_id } = req.params;
    const order = await Order_customer.findOne({ where: { order_customer_id } });
    const customer = await Item_order_customer.findOne({ where: { order_customer_id } });
    const state = order.state;
    const transaction = await sequelize.transaction();
    try {
        if (state === true) {
            return res.status(409).json({ message: '이미 처리된 주문이므로, 취소가 불가능 합니다.' });
        } else {
            order.destroy({ where: { order_customer_id } }, { transaction });
            customer.destroy({ where: { order_customer_id } }, { transaction });
        }
        await transaction.commit();
        return res.status(200).json({ message: '주문이 취소되었습니다.' });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ message: '주문 취소에 실패하였습니다.' });
    }
});

module.exports = router;
