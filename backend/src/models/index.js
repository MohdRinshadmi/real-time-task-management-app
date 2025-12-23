import User from "./userModel.js";
import Task from "./taskModel.js";
import sequelize from "../config/db.js";
import logger from "../helper/logger.js";

User.hasMany(Task, {
  foreignKey: "assigneeId",
  sourceKey: "userId"
});

Task.belongsTo(User, {
  foreignKey: "assigneeId",
  targetKey: "userId"
});

export async function initDb() {
  try {
    console.log("MySQL models synced");
  } catch (error) {
    logger.error("Error syncing MySQL models:", error);
    throw error;
  }
}

if (import.meta.url === process.argv[1]) {
  initDb().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export { User, Task };
