import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PhishingService {
  constructor(private readonly http: HttpService) {}

  async getAllAttempts() {
    try {
      const response = await firstValueFrom(
        this.http.get('http://localhost:8000/phishing/all'),
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
        this.http.post(`http://localhost:8000/phishing/send?email=${email}`),
      );
      return response.data;
    } catch (error) {
      console.error('Error sending phishing email:', error);
      throw new InternalServerErrorException('Failed to send phishing email');
    }
  }
}
