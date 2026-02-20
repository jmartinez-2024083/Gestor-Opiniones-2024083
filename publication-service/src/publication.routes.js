'use strict'
import { Router } from 'express';
import { createPublication, getPublicationByUser, getPublicationById, updatePublication, deletePublication } from './publication.controller.js';
import { validateJWT } from '../middlewares/validate-JWT.js';

const router = Router();

router.post('/', validateJWT, createPublication);
router.get('/user/:userId', validateJWT, getPublicationByUser);
router.get('/:id', validateJWT, getPublicationById);
router.put('/:id', validateJWT, updatePublication);
router.delete('/:id', validateJWT, deletePublication);

export default router;