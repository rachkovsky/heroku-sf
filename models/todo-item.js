module.exports = (sequelize, DataTypes) => {
  const todoitem = sequelize.define('Todoitem', {
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
    }
  });

  todoitem.associate = models => {
    Order.belongsTo(models.todouser);
  };

  return todoitem;
};