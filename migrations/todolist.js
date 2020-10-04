module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('todolist', {
        id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            field: "title",
            allowNull: false
        },
        completed: {
            type: Sequelize.BOOLEAN,
            field: "completed",
            allowNull: false,
            defaultValue: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            field: "user_id",
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('todolist');
    }
};