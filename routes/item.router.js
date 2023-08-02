const express = require('express');
const router = express.Router();

const { Items } = require('../models');

// 상품 추가
router.post('/item', async (req, res) => {
    const { name, type, price, amount = 1 } = req.body;
    try {
        if (!name || !price || !name.trim() || !price.trim()) {
            return res.status(412).json({ errorMessage: '상품의 이름 또는 가격을 입력해주세요.' });
        }
        if (!type) {
            return res.status(412).json({ errorMessage: '알맞은 타입을 지정해 주세요.' });
        }
        await Items.create({ name, type, price, amount });
        return res.status(200).json({ msg: '성공적으로 상품이 추가 되었습니다.' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: '상품추가에 실패하였습니다.' });
    }
});

// 상품 조회
router.get('/item', async (req, res) => {
    try {
        const items = await Items.findAll({});
        return res.status(200).json({ items, msg: '전체상품이 조회되었습니다.' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: '상품 조회에 실패하였습니다.' });
    }
});

// 타입별 상품 조회
router.get('/item/:type', async (req, res) => {
    const { type } = req.params;
    const items = await Items.findAll({ where: { type } });
    return res.status(200).json({ items, msg: '타입별 상품이 조회되었습니다.' });
});

// 상품 삭제
router.delete('/item/:type', async (req, res) => {
    const { type } = req.params;
    const { name, answer } = req.body;
    const item = await Items.findOne({ where: { name } });

    // 수량이 남은 상품 삭제시 삭제 확인 함수
    const okay = async function (ok) {
        console.log(ok);
        if (ok !== '네') {
            return res.status(201).json({ msg: '수량이 남은 상품삭제를 취소했습니다.' });
        } else if (ok === '네') {
            await Items.destroy({ where: { type, name } });
            return res.status(200).json({ msg: '수량이 남은 상품이 삭제되었습니다.' });
        }
    };

    // 삭제 메인 로직
    try {
        if (item.amount === 0) {
            await Items.destroy({ where: { type, name } });
            return res.status(200).json({ msg: '상품이 삭제되었습니다.' });
        } else {
            console.log({ msg: '현재 수량이 남아있습니다. 정말 삭제하시겠습니까?' });
            okay(answer);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: '상품 삭제에 실패하였습니다.' });
    }
});

// 상품 수정
router.put('/item', async (req, res) => {
    const { name, price } = req.body;
    try {
        if (!name || !name.trim()) {
            return res.status(412).json({ errorMessage: '이름을 입력해주세요.' });
        }
        if (!price || !price.trim()) {
            return res.status(412).json({ errorMessage: '가격을 입력해주세요.' });
        }
        if (price < 0) {
            return res.status(409).json({ errorMessage: '알맞은 가격을 입력해주세요.' });
        }
        await Items.update({ where: { name, price } });
        return res.status(200).json({ msg: '성공적으로 상품이 수정되었습니다.' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errorMessage: '상품 수정에 실패하였습니다.' });
    }
});

module.exports = router;
