import swaggerJsdoc from 'swagger-jsdoc';


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StockFlow',
      version: '1.0.0',
      description: 'Inventory backend',
      
    }
  },
  apis: ['./src/routes/*.js', './src/docs/*.yaml']
};


const swaggerSpec = swaggerJsdoc(options);


export default swaggerSpec;
