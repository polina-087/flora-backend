import * as orderManager from "../services/orders.service.js";
import { ctrlWrapper } from "../helpers/index.js";

const processNewOrder = async (req, res) => {
    const savedOrder = await orderManager.createOrder(req.body);
    res.status(201).json(savedOrder);
};

export default {
    add: ctrlWrapper(processNewOrder),
};