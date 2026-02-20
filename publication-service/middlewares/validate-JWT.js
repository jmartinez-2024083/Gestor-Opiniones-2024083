'use strict'
import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token)
        return res.status(401).json({ message: 'No token provided' });

    try {
        const cleanToken = token.replace('Bearer ', '');
        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};