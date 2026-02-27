import { Router } from 'express';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { createPublication, getMyPublications, getPublicationById, updatePublication, deletePublication} from './publication.controller.js';

const router = Router();

router.post('/', validateJWT, createPublication);
router.get('/my-publications', validateJWT, getMyPublications);
router.get('/my-publications', validateJWT, getPublicationById);
router.put('/my-publications/:id', validateJWT, updatePublication);
router.delete('/my-publications/:id', validateJWT, deletePublication);

export default router;