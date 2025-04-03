import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import * as FormData from 'form-data';
import { UserJWTResponse } from 'src/auth/types/jwt.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReceiptService {
  private MINDEE_API_KEY: string = '';
  private MINDEE_URL: string =
    'https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict';
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    private configService: ConfigService,
  ) {
    this.MINDEE_API_KEY = configService.get<string>('MINDEE_API_KEY') as string;
  }

  private parseMindeeResponse(data: any) {
    try {
      const prediction = data.document?.inference?.prediction;

      const amount = prediction?.total_amount?.value ?? 0.0;
      const date = prediction?.date?.value;
      const category = (prediction?.category?.value ?? 'Other').toUpperCase();
      const paymentMethod = (prediction?.payment_method?.value ?? 'OTHER')
        .replace(' ', '_')
        .toUpperCase();
      const merchant = prediction?.supplier_name?.value ?? '';
      const tags = category ? [category.toLowerCase()] : [];

      return {
        amount,
        type: 'Expense',
        description: merchant
          ? `Purchased at ${merchant}`
          : 'Auto-scanned receipt',
        category,
        date,
        paymentMethod,
        recurringTransaction: false,
        tags,
      };
    } catch (e) {
      console.error('Error parsing Mindee response:', e);
      throw new Error('Failed to parse Mindee response');
    }
  }

  async processReceipt(
    file: Express.Multer.File,
    user: UserJWTResponse,
  ): Promise<any> {
    const formData = new FormData();
    formData.append('document', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    try {
      const { data: mindeeResponse } = await axios.post(
        this.MINDEE_URL,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Token ${this.MINDEE_API_KEY}`,
          },
        },
      );

      const parsedTransaction = this.parseMindeeResponse(mindeeResponse);

      await this.transactionModel.create({
        ...parsedTransaction,
        userId: user._id,
      });

      return parsedTransaction;
    } catch (error) {
      console.error(
        'Error processing receipt with Mindee:',
        error.response?.data || error,
      );
      throw new BadRequestException('Failed to process receipt.');
    }
  }
}
