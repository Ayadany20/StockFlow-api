import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'StockFlow API v2', version: '1.0.0', description: 'Inventory backend' }
  },
  apis: ['./src/routes/*.js','./src/docs/*.yaml']
};
const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiMiddleware = swaggerUi.serve;
export const swaggerUiDoc = swaggerUi.setup(swaggerSpec);
