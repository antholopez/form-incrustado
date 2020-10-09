import { Controller, Get, Render, Post, Req } from '@nestjs/common';
import { PaymentFormService } from './payment-form.service';

@Controller('payment-form')
export class PaymentFormController {
  constructor(private readonly paymentFormService: PaymentFormService) {}

  @Get()
  @Render('form')
  async formAPI() {
    let {
      actionMode,
      amount,
      ctxMode,
      currency,
      pageAction,
      paymentConfig,
      siteId,
      transDate,
      transId,
      version,
      signature,
    } = await this.paymentFormService.formPago();
    return {
      actionMode,
      amount,
      ctxMode,
      currency,
      pageAction,
      paymentConfig,
      siteId,
      transDate,
      transId, 
      version, 
      signature
    };
  }
}
