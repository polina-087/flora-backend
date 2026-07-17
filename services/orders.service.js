import { Order } from "../models/index.js";

export const insertOrder = (payload) => {
    return Order.create(payload);
};