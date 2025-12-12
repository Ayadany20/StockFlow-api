import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "StockFlow API",
    version: "2.0.0",
    description: "Documentación de API para el sistema de inventario StockFlow"
  },
  servers: [
    {
      url: "http://localhost:3000/api/v2",
      description: "Servidor local"
    }
  ],

  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },

    schemas: {
      /* ===========================================================
       * USER
       * =========================================================== */
      User: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
          role: {
            type: "string",
            enum: ["admin", "employee"]
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },

      /* LOGIN REQUEST */
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string" },
          password: { type: "string" }
        }
      },

      /* LOGIN RESPONSE */
      LoginResponse: {
        type: "object",
        properties: {
          token: { type: "string" },
          user: { $ref: "#/components/schemas/User" }
        }
      },

      /* ===========================================================
       * PRODUCT
       * =========================================================== */
      Product: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          stock: { type: "number" },
          minStock: { type: "number" },
          price: { type: "number" },
          category: { $ref: "#/components/schemas/Category" },
          provider: { $ref: "#/components/schemas/Provider" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },

      /* ===========================================================
       * CATEGORY
       * =========================================================== */
      Category: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          description: { type: "string" }
        }
      },

      /* ===========================================================
       * PROVIDER
       * =========================================================== */
      Provider: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          contact: { type: "string" },
          phone: { type: "string" },
          email: { type: "string" },
          address: { type: "string" }
        }
      },

      /* ===========================================================
       * MOVEMENT
       * =========================================================== */
      Movement: {
        type: "object",
        properties: {
          _id: { type: "string" },
          product: { $ref: "#/components/schemas/Product" },
          type: {
            type: "string",
            enum: ["IN", "OUT"]
          },
          quantity: { type: "number" },
          date: { type: "string", format: "date-time" },
          note: { type: "string" },
          user: { $ref: "#/components/schemas/User" }
        }
      },

      /* ===========================================================
       * ALERT
       * =========================================================== */
      Alert: {
        type: "object",
        properties: {
          product: { $ref: "#/components/schemas/Product" },
          message: { type: "string" },
          level: {
            type: "string",
            enum: ["low_stock", "out_of_stock"]
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"] // ¡Tus rutas se documentarán aquí!
};

export default swaggerJSDoc(options);
