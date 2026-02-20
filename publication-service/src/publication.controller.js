'use strict'
import {createPublicationService, getPublicationsByUserService, getPublicationByIdService, updatePublicationService, deletePublicationService } from './publication.service.js';

export const createPublication = async (req, res) => {
    try {
        const publication = await createPublicationService(req.body);
        res.status(201).json(publication);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPublicationsByUser = async (req, res) => {
    try {
        const publications = await getPublicationsByUserService(req.params.userId);
        res.json(publications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPublicationById = async (req, res) => {
    try {
        const publication = await getPublicationByIdService(req.params.id);
        if (!publication) return res.status(404).json({ message: 'Publicación no encontrada' });
        res.json(publication);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updatePublication = async (req, res) => {
    try {
        const publication = await updatePublicationService(req.params.id, req.body);
        res.json(publication);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deletePublication = async (req, res) => {
    try {
        const publication = await deletePublicationService(req.params.id);
        res.json({ message: 'Publicación desactivada', publication });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};