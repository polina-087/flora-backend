import { Router } from "express";
import feedbackActions from "../../controllers/feedbacks.controller.js";
import { validateBody, isValidId } from "../../middlewares/index.js";
import {
  createFeedbackValidation,
  updateFeedbackValidation,
} from "../../schemas/feedback.schemas.js";

const feedbacksRouter = Router();

/**
 * @swagger
 * /api/feedbacks:
 *   get:
 *     summary: Retrieve all client testimonials
 *     tags: [Feedbacks]
 *     responses:
 *       200:
 *         description: A JSON array of feedback objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feedback'
 */
feedbacksRouter.get("/", feedbackActions.getAll);

/**
 * @swagger
 * /api/feedbacks/{id}:
 *   get:
 *     summary: Fetch a specific feedback entry by its ID
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: The requested feedback object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       404:
 *         description: Feedback entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
feedbacksRouter.get("/:id", isValidId, feedbackActions.getById);

/**
 * @swagger
 * /api/feedbacks:
 *   post:
 *     summary: Submit a new client feedback
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackCreate'
 *     responses:
 *       201:
 *         description: Successfully created feedback entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Payload validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
feedbacksRouter.post("/", validateBody(createFeedbackValidation), feedbackActions.add);
/**
 * @swagger
 * /api/feedbacks/{id}:
 *   put:
 *     summary: Modify an existing client feedback
 *     tags: [Feedbacks]
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
 *             $ref: '#/components/schemas/FeedbackUpdate'
 *     responses:
 *       200:
 *         description: The feedback was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Validation failed or request body is empty
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Target feedback not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
feedbacksRouter.put("/:id", isValidId, validateBody(updateFeedbackValidation), feedbackActions.updateById);

/**
 * @swagger
 * /api/feedbacks/{id}:
 *   delete:
 *     summary: Remove a feedback entry
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Feedback successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Successfully deleted }
 *       404:
 *         description: Target feedback not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
feedbacksRouter.delete("/:id", isValidId, feedbackActions.deleteById);

export default feedbacksRouter;