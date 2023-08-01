'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Order_items', {
            order_items_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            item_id: {
                allowNull: false,
                type: Sequelize.NUMBER,
            },
            amount: {
                allowNull: false,
                type: Sequelize.NUMBER,
            },
            state: {
                allowNull: false,
                type: Sequelize.NUMBER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Order_items');
    },
};
