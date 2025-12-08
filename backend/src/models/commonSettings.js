import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const CommonSetting = sequelize.define("CommonSetting",{
    logoutTime: DataTypes.INTEGER,
    active: DataTypes.INTEGER
})

export default CommonSetting