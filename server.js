import "dotenv/config";
import app from "./app.js";
import "./models/index.js";
import { connectDB } from "./db/sequelize.js";
import { seedIfEmpty } from "./seed/seedIfEmpty.js";

const SERVER_PORT = process.env.PORT || 3000;

const initializeApp = async () => {
    try {
        await connectDB();
        await seedIfEmpty();

        app.listen(SERVER_PORT, () => {
            console.log(`🚀 Flora API is successfully running on port ${SERVER_PORT}`);
        });
    } catch (err) {
        console.error("❌ Critical Error: Database connection failed ->", err.message);
        process.exit(1);
    }
};

initializeApp();