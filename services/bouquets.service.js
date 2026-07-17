import { Bouquet } from "../models/index.js";

export const retrieveAllBouquets = ({ page, limit, category, favorite } = {}) => {
    const queryFilter = {};

    if (category && category !== "all") {
        queryFilter.category = category;
    }

    if (favorite !== undefined) {
        queryFilter.favorite = String(favorite) === "true";
    }

    const queryConfig = {
        where: queryFilter,
        order: [["createdAt", "ASC"]],
    };

    const limitNum = Number(limit);
    const pageNum = Number(page);

    if (limitNum > 0 && pageNum > 0) {
        queryConfig.limit = limitNum;
        queryConfig.offset = (pageNum - 1) * limitNum;
    }

    return Bouquet.findAll(queryConfig);
};

export const findBouquetById = (bouquetId) => Bouquet.findByPk(bouquetId);

export const insertBouquet = (payload) => Bouquet.create(payload);

export const editBouquet = async (bouquetId, updateData) => {
    const existingBouquet = await Bouquet.findByPk(bouquetId);

    if (!existingBouquet) return null;

    return existingBouquet.update(updateData);
};

export const eraseBouquet = async (bouquetId) => {
    const targetBouquet = await Bouquet.findByPk(bouquetId);

    if (!targetBouquet) return null;

    await targetBouquet.destroy();
    return targetBouquet;
};

export const toggleFavoriteStatus = async (bouquetId, isFavorite) => {
    const targetBouquet = await Bouquet.findByPk(bouquetId);

    if (!targetBouquet) return null;

    return targetBouquet.update({ favorite: isFavorite });
};

export const changeBouquetImage = async (bouquetId, newPhotoURL) => {
    const targetBouquet = await Bouquet.findByPk(bouquetId);

    if (!targetBouquet) return null;

    return targetBouquet.update({ photoURL: newPhotoURL });
};