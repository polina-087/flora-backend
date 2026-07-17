import { Sequelize } from "sequelize";

const requireSSL = process.env.DB_SSL === "true";

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: requireSSL ? { ssl: { require: true, rejectUnauthorized: false } } : {},
  logging: false, 
});

export const dbInstance = sequelize;

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ Secure connection to PostgreSQL established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    throw error;
  }
};