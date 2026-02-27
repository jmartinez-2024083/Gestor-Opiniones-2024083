import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateFields } from '../middlewares/validate-fields.js';
import {
    createPublication,
    getAllPublications,
    getMyPublications,
    getPublicationById,
    updatePublication,
    deletePublication
} from './publication.controller.js';

const router = Router();

// Validaciones reutilizables
const publicationValidations = [
    body('titulo')
        .notEmpty().withMessage('El título es obligatorio')
        .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres')
        .isLength({ max: 100 }).withMessage('El título no puede superar los 100 caracteres')
        .trim(),
    body('categoria')
        .notEmpty().withMessage('La categoría es obligatoria')
        .isIn(['positiva', 'media', 'negativa']).withMessage('La categoría debe ser: positiva, media o negativa'),
    body('texto')
        .notEmpty().withMessage('El texto es obligatorio')
        .isLength({ min: 10 }).withMessage('El texto debe tener al menos 10 caracteres')
        .isLength({ max: 2000 }).withMessage('El texto no puede superar los 2000 caracteres')
        .trim()
];

const idValidation = [
    param('id')
        .notEmpty().withMessage('El ID es obligatorio')
        .isMongoId().withMessage('El ID no tiene un formato válido')
];

// Rutas
router.post('/',
    validateJWT,
    publicationValidations,
    validateFields,
    createPublication
);

router.get('/',
    validateJWT,
    getAllPublications
);

router.get('/my-publications',
    validateJWT,
    getMyPublications
);

router.get('/:id',
    validateJWT,
    idValidation,
    validateFields,
    getPublicationById
);

router.put('/:id',
    validateJWT,
    idValidation,
    [
        body('titulo')
            .optional()
            .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres')
            .isLength({ max: 100 }).withMessage('El título no puede superar los 100 caracteres')
            .trim(),
        body('categoria')
            .optional()
            .isIn(['positiva', 'media', 'negativa']).withMessage('La categoría debe ser: positiva, media o negativa'),
        body('texto')
            .optional()
            .isLength({ min: 10 }).withMessage('El texto debe tener al menos 10 caracteres')
            .isLength({ max: 2000 }).withMessage('El texto no puede superar los 2000 caracteres')
            .trim()
    ],
    validateFields,
    updatePublication
);

router.delete('/:id',
    validateJWT,
    idValidation,
    validateFields,
    deletePublication
);

export default router;