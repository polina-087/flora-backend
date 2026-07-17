import { Router } from "express";
import bouquetActions from "../../controllers/bouquets.controller.js";
import { validateBody, isValidId, upload } from "../../middlewares/index.js";
import {
  createBouquetValidation,
  updateBouquetValidation,
  favoriteBouquetValidation,
} from "../../schemas/bouquet.schemas.js";

const bouquetsRouter = Router();

/**
 * @swagger
 * /api/bouquets:
 *   get:
 *     summary: Retrieve a list of bouquets
 *     tags: [Bouquets]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema: { type: string, enum: [roses, mixed, seasonal, premium] }
 *         description: Filter items by category
 *       - in: query
 *         name: favorite
 *         schema: { type: boolean }
 *         description: Filter items by favorite status
 *     responses:
 *       200:
 *         description: A JSON array of bouquet objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bouquet'
 */
bouquetsRouter.get("/", bouquetActions.getAll);

/**
 * @swagger
 * /api/bouquets/{id}:
 *   get:
 *     summary: Fetch a single bouquet by its ID
 *     tags: [Bouquets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: The requested bouquet object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bouquet'
 *       404:
 *         description: Bouquet not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
bouquetsRouter.get("/:id", isValidId, bouquetActions.getById);

/**
 * @swagger
 * /api/bouquets:
 *   post:
 *     summary: Add a new bouquet to the catalogue
 *     tags: [Bouquets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BouquetCreate'
 *     responses:
 *       201:
 *         description: Successfully created bouquet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bouquet'
 *       400:
 *         description: Validation payload error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
bouquetsRouter.post("/", validateBody(createBouquetValidation), bouquetActions.add);

/**
 * @swagger
 * /api/bouquets/{id}:
 *   put:
 *     summary: Modify an existing bouquet
 *     tags: [Bouquets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BouquetUpdate'
 *     responses:
 *       200:
 *         description: The bouquet was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bouquet'
 *       400:
 *         description: Validation failed or request body is empty
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Target bouquet not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
bouquetsRouter.put("/:id", isValidId, validateBody(updateBouquetValidation), bouquetActions.updateById);

/**
 * @swagger
 * /api/bouquets/{id}:
 *   delete:
 *     summary: Remove a bouquet from the catalogue
 *     tags: [Bouquets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Bouquet successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Deleted successfully }
 *       404:
 *         description: Target bouquet not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
bouquetsRouter.delete("/:id", isValidId, bouquetActions.deleteById);

/**
 * @swagger
 * /api/bouquets/{id}/favorite:
 *   patch:
 *     summary: Toggle the favorite status for a bouquet
 *     tags: [Bouquets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BouquetFavorite'
 *     responses:
 *       200:
 *         description: Favorite status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bouquet'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Target bouquet not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
bouquetsRouter.patch("/:id/favorite", isValidId, validateBody(favoriteBouquetValidation), bouquetActions.updateFavorite);

/**
 * @swagger
 * /api/bouquets/{id}/photo:
 *   patch:
 *     summary: Update the main image for a specific bouquet
 *     tags: [Bouquets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully uploaded image URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 photoURL: { type: string }
 *       400:
 *         description: File is missing or has an unsupported format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Bouquet not found in the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
bouquetsRouter.patch("/:id/photo", isValidId, upload.single("photo"), bouquetActions.updatePhoto);

export default bouquetsRouter;