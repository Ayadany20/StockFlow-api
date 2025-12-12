// src/utils/jwt.util.js
const jwt = require('jsonwebtoken');
const serverConfig = require('../config/server.config');

/**
 * ==========================================
 * UTILIDADES PARA MANEJO DE JWT
 * ==========================================
 * Este archivo centraliza la lógica de generación
 * y verificación de tokens JWT
 */

/**
 * Genera un token de acceso JWT
 * 
 * @param {Object} payload - Datos a incluir en el token (user id, role, etc.)
 * @param {String} expiresIn - Tiempo de expiración (opcional, usa config por defecto)
 * @returns {String} Token JWT firmado
 * 
 * @example
 * const token = generateAccessToken({ id: 1, email: 'user@example.com', role: 'user' });
 */
const generateAccessToken = (payload, expiresIn = null) => {
    try {
        // Preparar el payload (datos que irán dentro del token)
        const tokenPayload = {
            ...payload,
            type: 'access', // Tipo de token
            iat: Math.floor(Date.now() / 1000) // Issued at (timestamp de creación)
        };

        // Opciones del token
        const options = {
            expiresIn: expiresIn || serverConfig.jwt.expiresIn,
            issuer: serverConfig.jwt.issuer,
            audience: serverConfig.jwt.audience,
            algorithm: serverConfig.jwt.algorithm
        };

        // Generar y firmar el token
        return jwt.sign(tokenPayload, serverConfig.jwt.secret, options);
    } catch (error) {
        console.error('Error al generar access token:', error);
        throw new Error('Error al generar token de acceso');
    }
};

/**
 * Genera un refresh token JWT (vida más larga)
 * Se usa para obtener un nuevo access token sin re-autenticar
 * 
 * @param {Object} payload - Datos del usuario
 * @returns {String} Refresh token JWT
 * 
 * @example
 * const refreshToken = generateRefreshToken({ id: 1 });
 */
const generateRefreshToken = (payload) => {
    try {
        const tokenPayload = {
            id: payload.id, // Solo el ID para refresh tokens
            type: 'refresh',
            iat: Math.floor(Date.now() / 1000)
        };

        const options = {
            expiresIn: serverConfig.jwt.refreshExpiresIn,
            issuer: serverConfig.jwt.issuer,
            audience: serverConfig.jwt.audience,
            algorithm: serverConfig.jwt.algorithm
        };

        return jwt.sign(tokenPayload, serverConfig.jwt.secret, options);
    } catch (error) {
        console.error('Error al generar refresh token:', error);
        throw new Error('Error al generar refresh token');
    }
};

/**
 * Verifica y decodifica un token JWT
 * 
 * @param {String} token - Token a verificar
 * @returns {Object} Payload decodificado si es válido
 * @throws {Error} Si el token es inválido o expiró
 * 
 * @example
 * try {
 *   const decoded = verifyToken(token);
 *   console.log('User ID:', decoded.id);
 * } catch (error) {
 *   console.error('Token inválido:', error.message);
 * }
 */
const verifyToken = (token) => {
    try {
        const options = {
            issuer: serverConfig.jwt.issuer,
            audience: serverConfig.jwt.audience,
            algorithms: [serverConfig.jwt.algorithm]
        };

        // Verificar firma y decodificar
        const decoded = jwt.verify(token, serverConfig.jwt.secret, options);
        return decoded;
    } catch (error) {
        // Errores específicos
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expirado');
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Token inválido');
        } else if (error.name === 'NotBeforeError') {
            throw new Error('Token aún no es válido');
        }
        
        throw new Error('Error al verificar token');
    }
};

/**
 * Decodifica un token sin verificar (útil para debug)
 * ⚠️ NO usar para autenticación, solo para inspección
 * 
 * @param {String} token - Token a decodificar
 * @returns {Object|null} Payload decodificado o null si falla
 */
const decodeToken = (token) => {
    try {
        return jwt.decode(token, { complete: true });
    } catch (error) {
        console.error('Error al decodificar token:', error);
        return null;
    }
};

/**
 * Extrae el token del header Authorization
 * Soporta formato: "Bearer <token>"
 * 
 * @param {String} authHeader - Header de autorización
 * @returns {String|null} Token extraído o null
 * 
 * @example
 * const token = extractTokenFromHeader(req.headers.authorization);
 */
const extractTokenFromHeader = (authHeader) => {
    if (!authHeader) {
        return null;
    }

    // Verificar que tenga el formato "Bearer <token>"
    const parts = authHeader.split(' ');
    
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }

    return parts[1];
};

/**
 * Genera un par de tokens (access + refresh)
 * 
 * @param {Object} user - Datos del usuario
 * @returns {Object} { accessToken, refreshToken, expiresIn }
 * 
 * @example
 * const tokens = generateTokenPair(user);
 * res.json({ ...tokens, user });
 */
const generateTokenPair = (user) => {
    // Payload para el access token (info completa del usuario)
    const accessPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
    };

    // Payload para refresh token (solo ID)
    const refreshPayload = {
        id: user.id
    };

    return {
        accessToken: generateAccessToken(accessPayload),
        refreshToken: generateRefreshToken(refreshPayload),
        expiresIn: serverConfig.jwt.expiresIn
    };
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    decodeToken,
    extractTokenFromHeader,
    generateTokenPair
};
