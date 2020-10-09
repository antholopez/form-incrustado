import { Controller, Get, Render, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { EmbeddedFormService } from './embedded-form.service';

@Controller('embedded-form')
export class EmbeddedFormController {
  constructor(private readonly embeddedFormService: EmbeddedFormService) {}

  @Get()
  @Render('index')
  async getHello(): Promise<object> {
    const res = await this.embeddedFormService.getTestForm();

    let formToken = res.answer.formToken;
    return { message: 'Prueba - formulario inscrustado', formToken };
  }

  @Post('payment-response')
  paymentResponse(@Req() request: Request) {
    const { body } = request
    return body['kr-answer']
    // return data
  }

  @Post('rest-form-inscrustado')
  async restFormIncrustado() {
    return await this.embeddedFormService.restFormIncrustado();
  }
}
