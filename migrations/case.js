module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('cases', {
        id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            field: "status",
            allowNull: false
        },
        case_id: {
            type: Sequelize.STRING,
            field: "case_id",
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('cases');
    }
};