import config from "../../config/config";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "node-express-typescript-boilerplate API documentation",
    version: "0.0.1",
    description: "This is a node express mongoose boilerplate in typescript",
    license: {
      name: "MIT",
      url: "",
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: "Development Server",
    },
  ],
};

export default swaggerDefinition;
