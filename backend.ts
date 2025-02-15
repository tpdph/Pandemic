// src/modules/trends/trends.controller.ts
import { Controller, Post, Get } from '@nestjs/common';
import { TrendsService } from './backend/src/trends.service';

@Controller('trends')
export class TrendsController {
  private readonly googleTrends: any;
  private readonly tiktokApi: any;
  private readonly aiAnalyzer: any;
  constructor(private readonly trendsService: TrendsService) {}

  @Get('analyze')
  async analyzeTrends() {
    return this.trendsService.analyzeTrends();
  }
}
