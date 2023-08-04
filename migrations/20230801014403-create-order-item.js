'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const orderItemState = {
            ORDERED: 'ORDERED',
            PENDING: 'PENDING',
            COMPLETED: 'COMPLETED',
            CANCELED: 'CANCELED',
        };

        await queryInterface.createTable('Order_items', {
            order_item_id: {
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
            amount: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            state: {
                allowNull: false,
                type: Sequelize.ENUM(Object.values(orderItemState)),
                defaultValue: orderItemState.ORDERED,
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
