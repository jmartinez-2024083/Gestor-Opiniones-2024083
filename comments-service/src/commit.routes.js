'use strict';

import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateJWT } from '../middlewares/validate-JWT.js';
import { validateFields } from '../middlewares/validate-fields.js';
import {
    createComment,
    getCommentsByPublication,
    updateComment,
    deleteComment
} from './comment.controller.js';

const router = Router();

const idValidation = [
    param('id')
        .notEmpty().withMessage('El ID es obligatorio')
        .isMongoId().withMessage('El ID no tiene un formato válido')
];

const publicationIdValidation = [
    param('publicationId')
        .notEmpty().withMessage('El ID de publicación es obligatorio')
];

const contentValidation = [
    body('content')
        .notEmpty().withMessage('El contenido es obligatorio')
        .isLength({ min: 3 }).withMessage('El contenido debe tener al menos 3 caracteres')
        .isLength({ max: 500 }).withMessage('El contenido no puede superar los 500 caracteres')
        .trim()
];

// Crear comentario
router.post('/',
    validateJWT,
    [
        body('publicationId')
            .notEmpty().withMessage('El ID de publicación es obligatorio'),
        ...contentValidation
    ],
    validateFields,
    createComment
);

// Listar comentarios por publicación
router.get('/:publicationId',
    validateJWT,
    publicationIdValidation,
    validateFields,
    getCommentsByPublication
);

// Editar comentario (solo autor)
router.put('/:id',
    validateJWT,
    idValidation,
    contentValidation,
    validateFields,
    updateComment
);

// Eliminar comentario (solo autor)
router.delete('/:id',
    validateJWT,
    idValidation,
    validateFields,
    deleteComment
);

export default router;