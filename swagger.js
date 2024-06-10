// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configuration de base pour Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Documentation de l'API",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Serveur de développement",
    },
  ],
};

// Options pour swagger-jsdoc
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./router/*.js"], // Vous pouvez spécifier le chemin des fichiers où vous documentez vos routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
