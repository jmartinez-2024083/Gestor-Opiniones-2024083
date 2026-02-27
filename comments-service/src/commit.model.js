'use strict';

import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, 'El contenido es obligatorio'],
            minlength: [3, 'El contenido debe tener al menos 3 caracteres'],
            maxlength: [500, 'El contenido no puede superar los 500 caracteres'],
            trim: true,
        },
        userId: {
            type: String,
            required: [true, 'El usuario es obligatorio'],
        },
        publicationId: {
            type: String,
            required: [true, 'La publicación es obligatoria'],
        },
    },
    {
        timestamps: true,
    }
);

export const Comment = mongoose.model('Comment', commentSchema);