import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const CommonSettings = sequelize.define("CommonSetting",{
    logoutTime: DataTypes.INTEGER,
    active: DataTypes.INTEGER
})

export default CommonSettings