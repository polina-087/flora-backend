import * as feedbackOperations from "../services/feedbacks.service.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const getFeedbacksList = async (req, res) => {
    const result = await feedbackOperations.listFeedbacks();
    res.json(result);
};

const retrieveFeedbackById = async (req, res) => {
    const targetFeedback = await feedbackOperations.getFeedbackById(req.params.id);
    if (!targetFeedback) {
        throw HttpError(404, "Feedback not found");
    }
    res.json(targetFeedback);
};

const postFeedback = async (req, res) => {
    const newFeedback = await feedbackOperations.createFeedback(req.body);
    res.status(201).json(newFeedback);
};

const modifyFeedback = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw HttpError(400, "Body must have at least one field");
    }

    const updatedData = await feedbackOperations.updateFeedback(req.params.id, req.body);
    if (!updatedData) {
        throw HttpError(404, "Feedback not found");
    }
    res.json(updatedData);
};

const deleteFeedbackItem = async (req, res) => {
    const deletedItem = await feedbackOperations.removeFeedback(req.params.id);
    if (!deletedItem) {
        throw HttpError(404, "Feedback not found");
    }
    res.json(deletedItem);
};

export default {
    getAll: ctrlWrapper(getFeedbacksList),
    getById: ctrlWrapper(retrieveFeedbackById),
    add: ctrlWrapper(postFeedback),
    updateById: ctrlWrapper(modifyFeedback),
    deleteById: ctrlWrapper(deleteFeedbackItem),
};