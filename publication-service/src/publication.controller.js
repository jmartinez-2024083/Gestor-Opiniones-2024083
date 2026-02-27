'use strict'
import {
    createPublicationService,
    getAllPublicationsService,
    getPublicationsByUserService,
    getPublicationByIdService,
    updatePublicationService,
    deletePublicationService
} from './publication.service.js';

export const createPublication = async (req, res, next) => {
    try {
        const data = {
            ...req.body,
            user: req.user.id
        };

        const publication = await createPublicationService(data);

        res.status(201).json({
            success: true,
            message: 'Publicación creada exitosamente',
            publication
        });

    } catch (err) {
        next(err);
    }
};

export const getAllPublications = async (req, res, next) => {
    try {
        const publications = await getAllPublicationsService();

        res.json({
            success: true,
            total: publications.length,
            publications
        });

    } catch (err) {
        next(err);
    }
};

export const getMyPublications = async (req, res, next) => {
    try {
        const publications = await getPublicationsByUserService(req.user.id);

        res.json({
            success: true,
            total: publications.length,
            publications
        });

    } catch (err) {
        next(err);
    }
};

export const getPublicationById = async (req, res, next) => {
    try {
        const publication = await getPublicationByIdService(req.params.id);

        if (!publication)
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });

        res.json({
            success: true,
            publication
        });

    } catch (err) {
        next(err);
    }
};

export const updatePublication = async (req, res, next) => {
    try {
        const publication = await getPublicationByIdService(req.params.id);

        if (!publication)
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });

        if (publication.user.toString() !== req.user.id)
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para editar esta publicación'
            });

        const updated = await updatePublicationService(req.params.id, req.body);

        res.json({
            success: true,
            message: 'Publicación actualizada exitosamente',
            publication: updated
        });

    } catch (err) {
        next(err);
    }
};

export const deletePublication = async (req, res, next) => {
    try {
        const publication = await getPublicationByIdService(req.params.id);

        if (!publication)
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });

        if (publication.user.toString() !== req.user.id)
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar esta publicación'
            });

        await deletePublicationService(req.params.id);

        res.json({
            success: true,
            message: 'Publicación eliminada exitosamente'
        });

    } catch (err) {
        next(err);
    }
};