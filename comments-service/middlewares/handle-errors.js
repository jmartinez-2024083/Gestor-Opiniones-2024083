export const errorHandler = (err, req, res, next) => {
    console.error('---------------- ERROR ----------------');
    console.error(`Message: ${err?.message}`);
    console.error(`Stack: ${err?.stack}`);
    console.error(`Route: ${req.method} ${req.originalUrl}`);
    console.error('---------------------------------------');

    // 🔹 Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => ({
            field: error.path,
            message: error.message,
        }));

        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors
        });
    }

    // 🔹 Duplicate Key Error (Mongo 11000)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];

        return res.status(400).json({
            success: false,
            message: `${field} already exists`,
            error: 'DUPLICATE_KEY'
        });
    }

    // 🔹 Invalid ObjectId
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format',
            error: 'INVALID_ID'
        });
    }

    // 🔹 JWT Errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            error: 'INVALID_TOKEN'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expired',
            error: 'TOKEN_EXPIRED'
        });
    }

    // 🔹 Custom Errors (si tú lanzas errores manuales)
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.code || 'CUSTOM_ERROR'
        });
    }

    // 🔹 Default 500
    return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: 'INTERNAL_SERVER_ERROR',
        ...(process.env.NODE_ENV === 'development' && {
            details: err.message,
            stack: err.stack,
        })
    });
};