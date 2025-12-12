import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import serverConfig from './config/server.config.js';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import routes from './routes/index.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js'; 

const app = express();

// ==================== SEGURIDAD ====================
app.use(helmet());
app.use(cors({
    origin: serverConfig.cors.origin,
    credentials: true
}));

// ==================== MIDDLEWARES ====================
if (serverConfig.nodeEnv === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ==================== VARIABLES GLOBALES ====================
app.locals.dbConnected = false;
app.locals.dbError = null;

// ==================== RUTAS ====================
app.use(serverConfig.app.apiPrefix, routes);
// ==================== SWAGGER/OPENAPI ====================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        persistAuthorization: true,
        displayOperationId: true
    }
}));

// ==================== MANEJO DE ERRORES ====================
app.use(notFound);
app.use(errorHandler);

export default app;
