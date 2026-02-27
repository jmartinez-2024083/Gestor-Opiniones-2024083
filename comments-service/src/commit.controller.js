'use strict';

import {
    createCommentService,
    getCommentsByPublicationService,
    getCommentByIdService,
    updateCommentService,
    deleteCommentService
} from './comment.service.js';

export const createComment = async (req, res, next) => {
    try {
        const { publicationId, content } = req.body;
        const comment = await createCommentService(req.user.id, publicationId, content);

        res.status(201).json({
            success: true,
            message: 'Comentario creado exitosamente',
            comment
        });
    } catch (err) {
        next(err);
    }
};

export const getCommentsByPublication = async (req, res, next) => {
    try {
        const { publicationId } = req.params;
        const comments = await getCommentsByPublicationService(publicationId);

        res.json({
            success: true,
            total: comments.length,
            comments
        });
    } catch (err) {
        next(err);
    }
};

export const updateComment = async (req, res, next) => {
    try {
        const comment = await getCommentByIdService(req.params.id);

        if (!comment)
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });

        if (comment.userId.toString() !== req.user.id)
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para editar este comentario'
            });

        const updated = await updateCommentService(req.params.id, req.body.content);

        res.json({
            success: true,
            message: 'Comentario actualizado exitosamente',
            comment: updated
        });
    } catch (err) {
        next(err);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await getCommentByIdService(req.params.id);

        if (!comment)
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });

        if (comment.userId.toString() !== req.user.id)
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar este comentario'
            });

        await deleteCommentService(req.params.id);

        res.json({
            success: true,
            message: 'Comentario eliminado exitosamente'
        });
    } catch (err) {
        next(err);
    }
};