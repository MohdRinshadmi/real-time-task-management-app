import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define("Task", {
    taskId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.BIGINT.UNSIGNED,
    assigneeId: DataTypes.BIGINT.UNSIGNED,
    title: DataTypes.STRING(255),
    description: DataTypes.TEXT,
    status: DataTypes.ENUM("pending", "in_progress", "completed"),
  },
  {
    timestamps: true,
    sequelize,
    tableName: 'Tasks',
  }
);

export default Task;
