import { rename, unlink } from "node:fs/promises";
import path from "node:path";
import gravatar from "gravatar";
import * as bouquetOperations from "../services/bouquets.service.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const imageStoragePath = path.resolve("public", "photos");

const getBouquetsList = async (req, res) => {
    const { page = 1, limit = 10, category, favorite } = req.query;
    const result = await bouquetOperations.listBouquets({ page, limit, category, favorite });
    res.json(result);
};

const getBouquetDetails = async (req, res) => {
    const targetBouquet = await bouquetOperations.getBouquetById(req.params.id);
    if (!targetBouquet) {
        throw HttpError(404, "Bouquet not found");
    }
    res.json(targetBouquet);
};

const createNewBouquet = async (req, res) => {
    const payload = { ...req.body };

    if (!payload.photoURL) {
        payload.photoURL = gravatar.url(payload.title, { s: "250", d: "identicon", protocol: "https" });
    }

    const newBouquet = await bouquetOperations.createBouquet(payload);
    res.status(201).json(newBouquet);
};

const modifyBouquet = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw HttpError(400, "Body must have at least one field");
    }

    const updatedData = await bouquetOperations.updateBouquet(req.params.id, req.body);
    if (!updatedData) {
        throw HttpError(404, "Bouquet not found");
    }
    res.json(updatedData);
};

const deleteBouquet = async (req, res) => {
    const deletedItem = await bouquetOperations.removeBouquet(req.params.id);
    if (!deletedItem) {
        throw HttpError(404, "Bouquet not found");
    }
    res.json(deletedItem);
};

const changeFavoriteStatus = async (req, res) => {
    const updatedBouquet = await bouquetOperations.updateFavorite(req.params.id, req.body.favorite);
    if (!updatedBouquet) {
        throw HttpError(404, "Bouquet not found");
    }
    res.json(updatedBouquet);
};

const uploadBouquetImage = async (req, res) => {
    if (!req.file) {
        throw HttpError(400, "Missing or invalid image file");
    }

    const { id } = req.params;
    const bouquetExists = await bouquetOperations.getBouquetById(id);

    if (!bouquetExists) {
        await unlink(req.file.path);
        throw HttpError(404, "Bouquet not found");
    }

    const { filename, path: temporaryPath } = req.file;
    await rename(temporaryPath, path.join(imageStoragePath, filename));

    const photoURL = `${req.protocol}://${req.get("host")}/photos/${filename}`;

    await bouquetOperations.updatePhoto(id, photoURL);
    res.json({ photoURL });
};

export default {
    getAll: ctrlWrapper(getBouquetsList),
    getById: ctrlWrapper(getBouquetDetails),
    add: ctrlWrapper(createNewBouquet),
    updateById: ctrlWrapper(modifyBouquet),
    deleteById: ctrlWrapper(deleteBouquet),
    updateFavorite: ctrlWrapper(changeFavoriteStatus),
    updatePhoto: ctrlWrapper(uploadBouquetImage),
};