import {
  Controller,
  Get,
  Post,
  Query,
  InternalServerErrorException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { PhishingService } from '../services/phishing.service';
import { JwtAuthGuard } from 'src/auth/guard';

@Controller('manage-phishing')
export class PhishingController {
  constructor(private readonly service: PhishingService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAll() {
    try {
      return await this.service.getAllAttempts();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch attempts');
    }
  }

  @Post('send')
  @UseGuards(JwtAuthGuard)
  async send(@Query('email') email: string) {
    try {
      if (!email) {
        throw new BadRequestException('Email is required');
      }

      return await this.service.sendPhishingAttempt(email);
    } catch (error) {
      throw new InternalServerErrorException('Failed to send phishing email');
    }
  }
}
