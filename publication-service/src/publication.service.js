'use strict'
import Publication from './publication.model.js';

export const createPublicationService = async (data) => {
    return await Publication.create(data);
};

export const getPublicationsByUserService = async (userId) => {
    return await Publication.find({ user: userId, isActive: true });
};

export const getPublicationByIdService = async (id) => {
    return await Publication.findById(id);
};

export const updatePublicationService = async (id, data) => {
    return await Publication.findByIdAndUpdate(id, data, { new: true });
};

export const deletePublicationService = async (id) => {
    return await Publication.findByIdAndUpdate(id, { isActive: false }, { new: true });
};