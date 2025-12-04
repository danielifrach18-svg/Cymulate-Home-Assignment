
import {
  Controller,
  Get,
  Post,
  Query,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PhishingService } from '../services/phishing.service';

@Controller('phishing')
export class PhishingController {
  constructor(private phishingService: PhishingService) {}

  @Post('send')
  async sendEmail(@Query('email') email: string) {
    try {
      if (!email) {
        throw new BadRequestException('Email is required');
      }
      return await this.phishingService.sendPhishingEmail(email);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to send phishing email',
      );
    }
  }

  @Get('click')
  async clickEmail(@Query('email') email: string) {
    try {
      if (!email) {
        throw new BadRequestException('Email is required');
      }
      return await this.phishingService.markAsClicked(email);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to mark email as clicked',
      );
    }
  }

  @Get('all')
  async getAll() {
    try {
      return await this.phishingService.getAllAttempts();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch attempts');
    }
  }
}
