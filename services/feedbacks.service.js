import { Feedback } from "../models/index.js";

export const retrieveAllFeedbacks = () => {
    return Feedback.findAll({ order: [["createdAt", "ASC"]] });
};

export const findFeedbackById = (feedbackId) => {
    return Feedback.findByPk(feedbackId);
};

export const insertFeedback = (payload) => {
    return Feedback.create(payload);
};

export const editFeedback = async (feedbackId, updateData) => {
    const existingFeedback = await Feedback.findByPk(feedbackId);

    if (!existingFeedback) {
        return null;
    }

    return existingFeedback.update(updateData);
};

export const eraseFeedback = async (feedbackId) => {
    const targetFeedback = await Feedback.findByPk(feedbackId);

    if (!targetFeedback) {
        return null;
    }

    await targetFeedback.destroy();
    return targetFeedback;
};