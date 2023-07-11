'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            typePosts: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.TEXT
            },
            contentHTML: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
            },
            contentMarkdown: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
            },
            imageLink: {
                type: Sequelize.BLOB('long')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Posts');
    }
};