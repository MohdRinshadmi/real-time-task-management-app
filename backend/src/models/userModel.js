import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: DataTypes.STRING(255),
    email: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    phoneNumber: DataTypes.STRING(20),
    password: DataTypes.STRING(255),
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default User;
