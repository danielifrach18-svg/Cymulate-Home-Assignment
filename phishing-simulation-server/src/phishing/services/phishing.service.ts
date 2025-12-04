import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhishingAttempt, PhishingDocument } from '../schemas/phishing.schema';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';

const { PORT, EMAIL_USER, EMAIL_PASS } = process.env;

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingModel: Model<PhishingDocument>,
  ) {}

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  async sendPhishingEmail(email: string) {
    try {
      const subject = 'Test Phishing Email';
      const body = `Click this link: http://localhost:${PORT}/phishing/click?email=${email}`;

      const attempt = await this.phishingModel.create({
        email,
        subject,
        body,
        status: 'sent',
      });

      await this.transporter.sendMail({
        from: `Phishing Simulator" <${EMAIL_USER}>`,
        to: email,
        subject,
        text: body,
      });

      return attempt;
    } catch (error) {
      console.error('Error sending phishing email:', error);
      throw new InternalServerErrorException('Failed to send phishing email');
    }
  }

  async markAsClicked(email: string) {
    try {
      const updated = await this.phishingModel.findOneAndUpdate(
        { email },
        { status: 'clicked' },
        { new: true },
      );

      if (!updated) {
        throw new NotFoundException(
          `No phishing attempt found for email ${email}`,
        );
      }

      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error marking email as clicked:', error);
      throw new InternalServerErrorException('Failed to mark email as clicked');
    }
  }

  async getAllAttempts() {
    try {
      return await this.phishingModel.find();
    } catch (error) {
      console.error('Error fetching phishing attempts:', error);
      throw new InternalServerErrorException(
        'Failed to fetch phishing attempts',
      );
    }
  }
}
