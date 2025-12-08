import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define("Task", {
    taskId: DataTypes.INTEGER,
    title: DataTypes.STRING(255),
    description: DataTypes.TEXT,
    status: DataTypes.ENUM("pending", "in_progress", "completed"),
    assigneeId: DataTypes.INTEGER,
  },
  {
    timestamps: true,
    sequelize,
  }
);

export default Task;
