'use strict';

import * as commitService from './commit.service.js';

/**
 * Crear commit
 */
export const create = async (req, res) => {
    try {
        const { publicationId, content } = req.body;
        const commit = await commitService.createCommit(req.user.id, publicationId, content);
        res.status(201).json(commit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Obtener commits por publicación
 */
export const getByPublication = async (req, res) => {
    try {
        const { publicationId } = req.params;
        const commits = await commitService.getCommitsByPublication(publicationId);
        res.json(commits);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Actualizar commit
 */
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const commit = await commitService.updateCommit(id, req.user.id, content);
        res.json(commit);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

/**
 * Eliminar commit
 */
export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await commitService.deleteCommit(id, req.user.id);
        res.json({ message: 'Commit eliminado correctamente' });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};