"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const express_1 = __importDefault(require("express"));
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
const specs = (0, swagger_jsdoc_1.default)(options);
const router = express_1.default.Router();
router.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
exports.default = router;
