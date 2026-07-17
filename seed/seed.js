import "dotenv/config";
import { readFile } from "node:fs/promises";
import { dbInstance, connectDB } from "../db/sequelize.js";
import { Bouquet, Feedback } from "../models/index.js";

const fetchJsonData = async (filePath) => {
    const fileUrl = new URL(filePath, import.meta.url);
    const fileContent = await readFile(fileUrl, "utf-8");
    return JSON.parse(fileContent);
};

const runSeed = async () => {
    try {
        await connectDB();

        const bouquetsData = await fetchJsonData("./bouquets.seed.json");
        const feedbacksData = await fetchJsonData("./feedbacks.seed.json");

        await Bouquet.sync({ force: true });
        await Bouquet.bulkCreate(bouquetsData);

        await Feedback.sync({ force: true });
        await Feedback.bulkCreate(feedbacksData);

        console.log(`✅ Successfully seeded ${bouquetsData.length} bouquets and ${feedbacksData.length} feedbacks into the database.`);

        await dbInstance.close();
        process.exit(0);
    } catch (err) {
        console.error("❌ Database seeding encountered an error:", err.message);
        process.exit(1);
    }
};