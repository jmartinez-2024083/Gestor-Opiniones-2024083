'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import commitRoutes from '../src/commit.routes.js';

/**
 * Inicializa y levanta el servidor
 */
export const initServer = async () => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());

    // Ruta de prueba
    app.get('/', (req, res) => res.send('API running'));

    // Rutas de commits
    app.use('/comments', commitRoutes);

    // Conexión a MongoDB
    await dbConnection();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};