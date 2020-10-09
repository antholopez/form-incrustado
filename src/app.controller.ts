import { Controller, Get, Render, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // @Render('index')
  // async getHello(): Promise<object> {
  //   const res = await this.appService.getTestForm();

  //   let formToken = res.answer.formToken;
  //   return { message: 'Prueba - formulario inscrustado', formToken };
  // }

  @Get('form-pago')
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
    } = await this.appService.formPago();
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

  // @Post('respuesta-pago')
  // paymentResponse(@Req() request: Request) {
  //   const { body } = request
  //   return body['kr-answer']
  //   // return data
  // }

  // @Post('rest-form-inscrustado')
  // async restFormIncrustado() {
  //   return await this.appService.restFormIncrustado();
  // }
}
