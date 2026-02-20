'use strict';

import mongoose from 'mongoose';

// Exportamos mongoose por si algún archivo lo necesita directamente
export { mongoose };

const MONGO_URI = process.env.URI_MONGODB || 'mongodb://localhost:27017/foodline';

export const dbConnection = async () => {
    try {
        // Eventos de conexión
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB | Error de conexión:', err.message);
        });

        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | Intentando conectar a MongoDB...');
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB | Conectado a MongoDB');
        });

        mongoose.connection.on('open', () => {
            console.log('MongoDB | Conexión abierta a la base de datos FoodLine');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | Reconectado a MongoDB');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | Desconectado de MongoDB');
        });

        // Conectar
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB | Conexión inicial exitosa');
    } catch (error) {
        console.error('MongoDB | Error al conectar la DB:', error.message);
        process.exit(1);
    }
};

// Manejo de apagado limpio
const gracefulShutdown = async (signal) => {
    console.log(`MongoDB | Señal recibida: ${signal}. Cerrando conexión...`);
    try {
        await mongoose.connection.close();
        console.log('MongoDB | Conexión cerrada exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('MongoDB | Error durante shutdown:', error.message);
        process.exit(1);
    }
};

// Señales de terminación
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // nodemon