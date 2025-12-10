import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true        // FIXED
    },
    userName: DataTypes.STRING(255),
    email: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    password: DataTypes.STRING(255),
  },
  {
    timestamps: true,
  }
);

export default User;
