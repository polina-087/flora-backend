import multer from "multer";
import path from "node:path";

const tempStoragePath = path.resolve("temp");

const diskConfiguration = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempStoragePath);
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, extension).replace(/\s+/g, "_");
        cb(null, `${Date.now()}_${baseName}${extension}`);
    },
});

const mimeTypeValidator = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const upload = multer({
    storage: diskConfiguration,
    fileFilter: mimeTypeValidator,
    limits: { fileSize: 5 * 1024 * 1024 },
});