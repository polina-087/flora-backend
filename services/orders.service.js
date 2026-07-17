import { Order } from "../models/index.js";

export const createOrder = (payload) => {
    return Order.create(payload);
};