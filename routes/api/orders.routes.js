import { Router } from "express";
import orderActions from "../../controllers/orders.controller.js";
import { validateBody } from "../../middlewares/index.js";
import { createOrderValidation } from "../../schemas/order.schemas.js";

const ordersRouter = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new customer order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderCreate'
 *     responses:
 *       201:
 *         description: Order successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid request payload or validation failure
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
ordersRouter.post("/", validateBody(createOrderValidation), orderActions.add);

export default ordersRouter;