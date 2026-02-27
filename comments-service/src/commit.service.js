'use strict';

import { Comment } from './comment.model.js';

export const createCommentService = async (userId, publicationId, content) => {
    return await Comment.create({ userId, publicationId, content });
};

export const getCommentsByPublicationService = async (publicationId) => {
    return await Comment.find({ publicationId }).sort({ createdAt: -1 });
};

export const getCommentByIdService = async (id) => {
    return await Comment.findById(id);
};

export const updateCommentService = async (id, content) => {
    return await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true, runValidators: true }
    );
};

export const deleteCommentService = async (id) => {
    return await Comment.findByIdAndDelete(id);
};