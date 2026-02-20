'use strict'
import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
    titulo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GestorOpiniones',
        required: true
    },
    categoria: {
        type: String,
        enum: ['positiva', 'media', 'negativa'],
        default: 'positiva'
    },
    texto: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true,
        min: 1
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

publicationSchema.index({ restaurant: 1, number: 1 }, { unique: true });

export default mongoose.model('Publication', publicationSchema);