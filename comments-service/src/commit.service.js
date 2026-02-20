'use strict';

import { Commit } from './commit.model.js';

/**
 * Crea un commit (comentario) asociado al usuario logeado y a una publicación
 */
export const createCommit = async (userId, publicationId, content) => {
    const commit = await Commit.create({ userId, publicationId, content });
    return commit;
};

/**
 * Obtiene todos los commits de una publicación
 */
export const getCommitsByPublication = async (publicationId) => {
    return await Commit.find({ publicationId }).sort({ createdAt: -1 });
};

/**
 * Actualiza un commit si pertenece al usuario logeado
 */
export const updateCommit = async (commitId, userId, content) => {
    const commit = await Commit.findOneAndUpdate(
        { _id: commitId, userId },
        { content },
        { new: true }
    );
    if (!commit) throw new Error('Commit no encontrado o sin permisos');
    return commit;
};

/**
 * Elimina un commit si pertenece al usuario logeado
 */
export const deleteCommit = async (commitId, userId) => {
    const deleted = await Commit.findOneAndDelete({ _id: commitId, userId });
    if (!deleted) throw new Error('Commit no encontrado o sin permisos');
    return true;
};