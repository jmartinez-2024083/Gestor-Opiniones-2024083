'use strict';

import { mongoose } from '../configs/db.js'; // Importamos mongoose desde tu db.js

// Esquema de Commit (comentario)
const commitSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, 'El contenido es obligatorio'],
            trim: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Referencia a usuario
            required: [true, 'El usuario es obligatorio'],
        },
        publicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publication', // Referencia a publicación
            required: [true, 'La publicación es obligatoria'],
        },
    },
    {
        timestamps: true, // createdAt y updatedAt automáticos
    }
);

// Exportamos el modelo
export const Commit = mongoose.model('Commit', commitSchema);