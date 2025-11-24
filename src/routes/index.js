// src/routes/index.js
const express = require('express');
const router = express.Router();
const serverConfig = require('../config/server.config');
const authRoutes = require('./auth.routes');
const eventRoutes = require('./event.routes');
const emailRoutes = require('./email.routes');

// Ruta principal de bienvenida/verificación
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: '✅ ¡API funcionando correctamente!',
        api: {
            name: serverConfig.app.name,
            version: serverConfig.app.version,
            environment: serverConfig.nodeEnv,
            apiPrefix: serverConfig.app.apiPrefix
        },
        database: {
            connected: req.app.locals.dbConnected,
            status: req.app.locals.dbConnected ? 'Conectado a SQL Server' : 'No conectado',
            error: req.app.locals.dbError
        },
        endpoints: {
            auth: `${serverConfig.app.apiPrefix}/auth`,
            events: `${serverConfig.app.apiPrefix}/events`,
            email: `${serverConfig.app.apiPrefix}/email`,
            health: `${serverConfig.app.apiPrefix}/health`
        },
        timestamp: new Date().toISOString()
    });
});

// Ruta de health check
router.get('/health', (req, res) => {
    const statusCode = req.app.locals.dbConnected ? 200 : 503;
    
    res.status(statusCode).json({
        status: req.app.locals.dbConnected ? 'healthy' : 'unhealthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        database: {
            connected: req.app.locals.dbConnected,
            error: req.app.locals.dbError
        },
        memory: {
            used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
            total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`
        },
        environment: serverConfig.nodeEnv
    });
});

// ==================== RUTAS DE LA API ====================
// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de eventos
router.use('/events', eventRoutes);

// Rutas de email
router.use('/email', emailRoutes);

module.exports = router;
