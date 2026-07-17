import { Feedback } from "../models/index.js";

export const listFeedbacks = () => {
    return Feedback.findAll({ order: [["createdAt", "ASC"]] });
};

export const getFeedbackById = (feedbackId) => {
    return Feedback.findByPk(feedbackId);
};

export const createFeedback = (payload) => {
    return Feedback.create(payload);
};

export const updateFeedback = async (feedbackId, updateData) => {
    const existingFeedback = await Feedback.findByPk(feedbackId);
    if (!existingFeedback) return null;
    return existingFeedback.update(updateData);
};

export const removeFeedback = async (feedbackId) => {
    const targetFeedback = await Feedback.findByPk(feedbackId);
    if (!targetFeedback) return null;
    await targetFeedback.destroy();
    return targetFeedback;
};