"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrendsController = void 0;
// src/modules/trends/trends.controller.ts
const common_1 = require("@nestjs/common");
const trends_service_1 = require("./backend/src/trends.service");
let TrendsController = class TrendsController {
    constructor(trendsService) {
        this.trendsService = trendsService;
    }
    async analyzeTrends() {
        return this.trendsService.analyzeTrends();
    }
};
exports.TrendsController = TrendsController;
__decorate([
    (0, common_1.Get)('analyze'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrendsController.prototype, "analyzeTrends", null);
exports.TrendsController = TrendsController = __decorate([
    (0, common_1.Controller)('trends'),
    __metadata("design:paramtypes", [trends_service_1.TrendsService])
], TrendsController);
