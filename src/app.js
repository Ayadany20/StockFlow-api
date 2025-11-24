import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { swaggerUiMiddleware, swaggerUiDoc } from './config/swagger.js';
import { sequelize } from './config/database.js';
import { errorHandler } from './middlewares/errorHandler.js';
import logger from './config/logger.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/status', (req,res) => res.json({ status: 'ok', time: new Date() }));
app.use('/api', routes);
app.use('/docs', swaggerUiMiddleware, swaggerUiDoc);

app.use(errorHandler);

(async ()=>{
  try {
    await sequelize.authenticate();
    logger.info('DB connected');
    await sequelize.sync({ alter: false });
  } catch(err){
    logger.error('DB connection error: ' + err.message);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> logger.info('Server listening on ' + PORT));

export default app;



// ==================== MANEJO DE ERRORES ====================
app.use(notFound);
app.use(errorHandler);

module.exports = app;
