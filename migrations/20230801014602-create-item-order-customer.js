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
                type: Sequelize.NUMBER,
            },
            order_customer_id: {
                allowNull: false,
                type: Sequelize.NUMBER,
            },
            amount: {
                allowNull: false,
                type: Sequelize.NUMBER,
            },
            option: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            price: {
                allowNull: false,
                type: Sequelize.STRING,
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
