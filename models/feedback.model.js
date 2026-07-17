import { DataTypes } from "sequelize";
import { dbInstance } from "../db/sequelize.js";

export const Feedback = dbInstance.define("client_feedback", {
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});