import DataTypes from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
    },
    userName: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
  },
  {
    sequelize,
    timestamps: true,
  }
);
export default User;
