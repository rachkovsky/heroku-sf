'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('todouser', [
            {
                email: 'user@one.com',
                password: 'yourpasswordehre1',
            },
            {
                email: 'user@two.com',
                password: 'yourpasswordehre2',
            },
            {
                email: 'user@three.com',
                password: 'yourpasswordehre3',
            },
    ]);
    },
down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('todouser', {});
    }
};