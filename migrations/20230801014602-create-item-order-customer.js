'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Item_order_customers', {
            item_order_customer_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            item_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Items',
                    key: 'item_id',
                },
                onDelete: 'CASCADE',
            },
            order_customer_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Order_customers',
                    key: 'order_customer_id',
                },
                onDelete: 'CASCADE',
            },
            amount: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            option: {
                allowNull: false,
                type: Sequelize.JSON,
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Item_order_customers');
    },
};
