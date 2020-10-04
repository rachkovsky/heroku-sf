module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('todouser', {
        id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            field: "email",
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            field: "password",
            allowNull: false
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('todouser');
    }
  };