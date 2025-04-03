import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: configService.get<string>('EMAIL_USERNAME'),
        pass: configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(to: string, subject: string, html: string, text?: string) {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USERNAME'),
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
