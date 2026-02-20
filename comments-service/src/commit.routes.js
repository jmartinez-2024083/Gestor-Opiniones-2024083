'use strict';

import { Router } from 'express';
import * as commitController from './commit.controller.js';
import { validateJWT } from '../middlewares/validate-JWT.js';

const router = Router();

// Crear commit (requiere usuario logeado)
router.post('/', validateJWT, commitController.create);

// Obtener commits de una publicación
router.get('/:publicationId', commitController.getByPublication);

// Actualizar commit (solo dueño)
router.put('/:id', validateJWT, commitController.update);

// Eliminar commit (solo dueño)
router.delete('/:id', validateJWT, commitController.remove);

export default router;