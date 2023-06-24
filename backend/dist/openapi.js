"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express API for JSONPlaceholder",
        version: "1.0.0",
    },
};
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ["./routes/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=openapi.js.map