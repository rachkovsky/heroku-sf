'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('todolist', [
            {
                title: 'Learn javascript',
                user_id: 1,
            },
            {
                title: 'Learn html',
                user_id: 1,
            },
            {
                title: 'Learn css',
                user_id: 1,
            },
            {
                title: 'Learn java',
                user_id: 2,
            },
            {
                title: 'Learn python',
                user_id: 2,
            },
            {
                title: 'Learn go', 
                user_id: 2,
            },
            {
                title: 'Learn salesforce',
                user_id: 3,
            },
            {
                title: 'Learn lightning',
                user_id: 3,
            },
            {
                title: 'Learn LWC', 
                user_id: 3,
            },

    ]);
    },
down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('todolist', {});
    }
};