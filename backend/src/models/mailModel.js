import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Mail = sequelize.define("Mail", {
    mailId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    senderId: DataTypes.BIGINT.UNSIGNED,
    senderEmail: DataTypes.STRING(255),
    recipientEmail: DataTypes.STRING(255),
    subject: DataTypes.STRING(255),
    body: DataTypes.TEXT,
    status: DataTypes.ENUM("sent", "failed", "draft"),
    direction: DataTypes.ENUM("sent", "received"),
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: 'Mails',
  }
);

export default Mail;
