export const notFound = (req, res, next) => {
    return res.status(404).json({
        success: false,
        message: `Ruta ${req.originalUrl} no encontrada`,
        error: 'NOT_FOUND'
    });
};