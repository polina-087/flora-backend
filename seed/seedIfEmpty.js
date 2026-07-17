import { readFile } from "node:fs/promises";
import { Bouquet, Feedback } from "../models/index.js";

const populateModel = async (dbModel, filePath, entityName) => {
    const existingRecords = await dbModel.count();

    if (existingRecords > 0) {
        return; 
    }

    const fileUrl = new URL(filePath, import.meta.url);
    const fileContent = await readFile(fileUrl, "utf-8");
    const parsedData = JSON.parse(fileContent);

    await dbModel.bulkCreate(parsedData);
    console.log(`🌱 Successfully injected ${parsedData.length} items into ${entityName}`);
};

export const seedIfEmpty = async () => {
    await populateModel(Bouquet, "./bouquets.seed.json", "bouquets collection");
    await populateModel(Feedback, "./feedbacks.seed.json", "feedbacks collection");
};