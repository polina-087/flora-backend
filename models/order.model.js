import { DataTypes } from "sequelize";
import { dbInstance } from "../db/sequelize.js";

export const Order = dbInstance.define("customer_order", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    agree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});