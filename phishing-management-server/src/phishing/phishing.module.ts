import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PhishingService } from './services/phishing.service';
import { PhishingController } from './controllers/phishing.controller';
import { JwtAuthGuard } from 'src/auth/guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [PhishingController],
  providers: [PhishingService, JwtAuthGuard],
})
export class PhishingModule {}
