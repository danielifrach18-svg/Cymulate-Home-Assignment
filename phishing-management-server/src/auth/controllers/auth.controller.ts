import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    try {
      const { email, password } = body;
      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }
      return await this.authService.register(email, password);
    } catch (error) {
      console.error('Register error:', error);
      throw new InternalServerErrorException(
        error.message || 'Failed to register',
      );
    }
  }

  @Post('login')
  async login(@Body() body: any) {
    try {
      const { email, password } = body;
      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }
      return await this.authService.login(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw new InternalServerErrorException(
        error.message || 'Failed to login',
      );
    }
  }
}
