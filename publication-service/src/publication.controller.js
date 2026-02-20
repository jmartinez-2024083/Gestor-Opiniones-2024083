'use strict'
import { createPublicationService, getPublicationsByUserService, getPublicationByIdService, updatePublicationService, deletePublicationService } from './publication.service.js';

export const createPublication = async (req, res) => {
    try {

        const data = {
            ...req.body,
            user: req.user.id
        };

        const publication = await createPublicationService(data);
        console.log("Decoded token:", req.user);

        res.status(201).json({
            success: true,
            publication
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMyPublications = async (req, res) => {
    try {

        const publications = await getPublicationsByUserService(req.user.id);

        res.json({
            success: true,
            publications
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPublicationById = async (req, res) => {
    try {

        const publication = await getPublicationByIdService(req.params.id);

        if (!publication)
            return res.status(404).json({ message: 'Publicación no encontrada' });

        res.json({
            success: true,
            publication
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updatePublication = async (req, res) => {
    try {

        const publication = await getPublicationByIdService(req.params.id);

        if (!publication)
            return res.status(404).json({ message: 'Publicación no encontrada' });

        if (publication.user.toString() !== req.user.id)
            return res.status(403).json({ message: 'No tienes permiso para editar esta publicación' });

        const updated = await updatePublicationService(req.params.id, req.body);

        res.json({
            success: true,
            updated
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deletePublication = async (req, res) => {
    try {

        const publication = await getPublicationByIdService(req.params.id);

        if (!publication)
            return res.status(404).json({ message: 'Publicación no encontrada' });

        if (publication.user.toString() !== req.user.id)
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta publicación' });

        const deleted = await deletePublicationService(req.params.id);

        res.json({
            success: true,
            message: 'Publicación desactivada',
            deleted
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};