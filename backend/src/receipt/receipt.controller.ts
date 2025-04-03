import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReceiptService } from './receipt.service';
import { Express } from 'express';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { UserRoles } from 'src/auth/roles/user-roles.enum';
import { UserJWTResponse } from 'src/auth/types/jwt.types';
import { User } from 'src/decorators/user.decorator';

@Controller('api/receipts')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post('upload')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.USER)
  @UseInterceptors(FileInterceptor('file'))
  async uploadReceipt(
    @UploadedFile() file: Express.Multer.File,
    @User() user: UserJWTResponse,
  ) {
    return this.receiptService.processReceipt(file, user);
  }
}
