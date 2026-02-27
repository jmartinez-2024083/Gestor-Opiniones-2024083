'use strict'
import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    categoria: {
        type: String,
        enum: ['positiva', 'media', 'negativa'],
        default: 'positiva'
    },
    texto: {
        type: String,
        required: [true, 'El texto es obligatorio']
    },
    user: {
        type: String,
        required: true
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