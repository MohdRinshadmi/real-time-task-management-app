import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PendingRegistration = sequelize.define("PendingRegistration", {
    username: DataTypes.STRING(255),
    email: DataTypes.STRING,
    status: DataTypes.STRING(255),
    userTokens: DataTypes.STRING(255),
    dateAdded: DataTypes.DATE,
    dateModified: DataTypes.DATE,
  },
  {
    sequelize,
  }
);

export default PendingRegistration;
