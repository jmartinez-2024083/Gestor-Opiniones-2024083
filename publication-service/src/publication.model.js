'use strict'
import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        minlength: [3, 'El título debe tener al menos 3 caracteres'],
        maxlength: [100, 'El título no puede superar los 100 caracteres'],
        trim: true
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: {
            values: ['positiva', 'media', 'negativa'],
            message: 'La categoría debe ser: positiva, media o negativa'
        }
    },
    texto: {
        type: String,
        required: [true, 'El texto es obligatorio'],
        minlength: [10, 'El texto debe tener al menos 10 caracteres'],
        maxlength: [2000, 'El texto no puede superar los 2000 caracteres'],
        trim: true
    },
    user: {
        type: String,
        required: [true, 'El autor es obligatorio']
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model('Publication', publicationSchema);