import { DataTypes } from "sequelize";
import { dbInstance } from "../db/sequelize.js";

export const Bouquet = dbInstance.define("bouquet_item", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    photoURL: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image2x: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    alt: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});