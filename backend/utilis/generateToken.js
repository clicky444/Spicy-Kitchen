import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // Ensure secure is false for non-SSL environments
    const secure = process.env.NODE_ENV === 'production' && process.env.USE_SSL === 'true';

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: secure, // Set secure to true only if in production environment with SSL
        sameSite: 'Strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    console.log('Token set in cookie:', token); // Log the token
};

export default generateToken;
