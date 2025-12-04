import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import 'dotenv/config';

const API_PHISHING_SIMULATION = process.env.API_PHISHING_SIMULATION;

@Injectable()
export class PhishingService {
  constructor(private readonly http: HttpService) {}

  async getAllAttempts() {
    try {
      const response = await firstValueFrom(
        this.http.get(`${API_PHISHING_SIMULATION}/phishing/all`),
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching phishing attempts:', error);
      throw new InternalServerErrorException(
        'Failed to fetch phishing attempts',
      );
    }
  }

  async sendPhishingAttempt(email: string) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${API_PHISHING_SIMULATION}/phishing/send?email=${email}`,
        ),
      );
      return response.data;
    } catch (error) {
      console.error('Error sending phishing email:', error);
      throw new InternalServerErrorException('Failed to send phishing email');
    }
  }
}
