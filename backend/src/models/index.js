import sequelize from "../config/db.js";
import logger from "../helper/logger.js";
import User from "./userModel.js";
import Task from "./taskModel.js";

const initAssociations = () => {
  User.hasMany(Task, {
    foreignKey: "assigneeId",
    sourceKey: "userId",
    as: "tasks",
  });

  Task.belongsTo(User, {
    foreignKey: "assigneeId",
    targetKey: "userId",
    as: "assignee",
  });
};


export const initDb = async () => {
  try {
    initAssociations();

    await sequelize.authenticate();
    logger.info("Database connection established");

    await sequelize.sync({ alter: false });
    logger.info("MySQL models synced successfully");
  } catch (error) {
    logger.error("Database initialization failed", error);
    throw error;
  }
};

export { sequelize, User, Task };
