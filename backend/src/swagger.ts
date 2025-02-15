import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Viral Video Automation API',
      version: '1.0.0',
    },
  },
  apis: ['./src/controllers/*.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
const router = express.Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
export default router;